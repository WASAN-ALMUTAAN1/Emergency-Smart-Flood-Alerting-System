/* =========================
   CORE DOM REFS (IDs unchanged)
========================== */
const uploadArea      = document.getElementById('upload-area');
const fileInput       = document.getElementById('file-input');
const uploadedImage   = document.getElementById('uploaded-image');
const placeholderText = document.querySelector('.placeholder-text');

const modelSelect     = document.getElementById('model-select');
const submitBtn       = document.getElementById('submit-btn');
const results         = document.getElementById('results');

const canvas          = document.getElementById('canvas');
const ctx             = canvas.getContext('2d');

const segmentationImg = document.getElementById('segmentation-img');
const deleteBtn       = document.getElementById('delete-btn');

const progressWrap    = document.getElementById('progress-wrap');
const progressText    = document.getElementById('progress-text');

const toast           = document.getElementById('toast');
const toastMsg        = document.getElementById('toast-msg');

let uploadedFile = null;

/* =========================
   HELPERS
========================== */
function showToast(message){
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function setBusy(isBusy, label="Processing…"){
  progressText.textContent = label;
  progressWrap.style.display = isBusy ? 'flex' : 'none';
  submitBtn.disabled = isBusy;
  uploadArea.style.pointerEvents = isBusy ? 'none' : 'auto';
  submitBtn.style.opacity = isBusy ? '0.92' : '1';
}

function addRipple(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size/2;
  const y = e.clientY - rect.top - size/2;

  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = size + 'px';
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  btn.appendChild(span);
  setTimeout(() => span.remove(), 700);
}
submitBtn.addEventListener('click', addRipple);

function confettiBurst(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const count = 18;
  const colors = ['#0f6a3a','#1aa36a','#b8f3d8','#ffffff'];
  const startX = window.innerWidth / 2;
  const startY = 120;

  for(let i=0;i<count;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.background = colors[i % colors.length];
    piece.style.left = (startX + (Math.random()*180 - 90)) + 'px';
    piece.style.top = startY + 'px';
    piece.style.width = (8 + Math.random()*8) + 'px';
    piece.style.height = (8 + Math.random()*8) + 'px';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 950);
  }
}

function resetDisplay(){
  results.innerHTML = "";
  canvas.style.display = 'none';
  segmentationImg.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function displayUploadedFile(file){
  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    placeholderText.style.display = "none";
    uploadedImage.src = e.target.result;
    uploadedImage.style.display = "block";
    deleteBtn.style.display = "block";
  };
  reader.readAsDataURL(file);
}

/* =========================
   UPLOAD INTERACTIONS
========================== */
deleteBtn.addEventListener('click', (event) => {
  event.stopPropagation();

  uploadedFile = null;
  uploadedImage.style.display = 'none';
  deleteBtn.style.display = 'none';
  placeholderText.style.display = 'block';
  fileInput.value = '';

  resetDisplay();
  uploadArea.classList.remove('dragover');
  showToast("Image removed");
});

uploadArea.addEventListener('click', () => {
  if (!uploadedFile) fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  uploadedFile = e.target.files[0];
  if (!uploadedFile) return;

  resetDisplay();
  displayUploadedFile(uploadedFile);
  showToast("Image uploaded");
});

uploadArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (event) => {
  event.preventDefault();
  uploadArea.classList.remove('dragover');

  const file = event.dataTransfer.files[0];
  if (!file) return;

  uploadedFile = file;
  resetDisplay();
  displayUploadedFile(uploadedFile);
  showToast("Image uploaded");
});

/* =========================
   UI RENDERERS
========================== */
function renderMetaCards({modelName, status, inferenceMs, timestamp}){
  const t  = timestamp ? timestamp : "—";
  const ms = (typeof inferenceMs === "number") ? `${inferenceMs} ms` : "—";

  return `
    <div class="meta-grid">
      <div class="meta-card">
        <div class="meta-label">Model</div>
        <div class="meta-value">${modelName}</div>
      </div>
      <div class="meta-card">
        <div class="meta-label">Status</div>
        <div class="meta-value">${status}</div>
      </div>
      <div class="meta-card">
        <div class="meta-label">Inference Time</div>
        <div class="meta-value">${ms}</div>
      </div>
    </div>
    <div style="font-size:12px;color:var(--muted);font-weight:900;margin-top:2px;">Timestamp: ${t}</div>
  `;
}

function setMeter(percent){
  const p = Math.max(0, Math.min(100, percent || 0));
  const el = document.querySelector('.meter-fill');
  if (el) requestAnimationFrame(()=> el.style.width = p.toFixed(1) + '%');
}

/* =========================
   CLASSIFICATION
========================== */
function updateClassificationResult(data, file){
  const label = data.result?.label ?? "—";
  const conf  = data.result?.confidence ?? 0;

  results.innerHTML = `
    ${renderMetaCards({
      modelName: "Classification",
      status: "Completed",
      inferenceMs: data.inference_ms,
      timestamp: data.timestamp
    })}
    <div class="chips">
      <span class="chip"><span class="dot"></span>Label: ${label}</span>
      <span class="chip"><span class="dot"></span>Confidence: ${conf.toFixed(1)}%</span>
    </div>

    <div class="meter">
      <div class="meter-title">
        <span>Confidence Meter</span>
        <span style="font-weight:950;">${conf.toFixed(1)}%</span>
      </div>
      <div class="meter-bar"><div class="meter-fill" style="width:0%"></div></div>
    </div>
  `;

  setMeter(conf);

  const img = new Image();
  const reader = new FileReader();
  reader.onload = (e) => {
    img.onload = () => {
      canvas.style.display = 'block';
      const W = 920;
      const scale = W / img.width;
      canvas.width = W;
      canvas.height = Math.round(img.height * scale);

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  segmentationImg.style.display = 'none';
}

/* =========================
   DETECTION (Canvas Drawing)
========================== */
function roundRect(ctx, x, y, w, h, r, fill, stroke){
  if (typeof r === 'number') r = {tl:r,tr:r,br:r,bl:r};

  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();

  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawDetectionsOnCanvas(img, detections){
  const W = 920;
  const scale = W / img.width;
  canvas.width = W;
  canvas.height = Math.round(img.height * scale);
  canvas.style.display = 'block';

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const dets = [...(detections || [])].sort((a,b)=> (a.confidence||0) - (b.confidence||0));

  const palette = [
    "#1aa36a","#0f6a3a","#2aa3ff","#ffb020","#ff4d4f","#a855f7","#14b8a6","#f97316"
  ];

  ctx.save();
  ctx.lineJoin = "round";
  ctx.textBaseline = "top";

  dets.forEach((d, idx)=>{
    const color = palette[idx % palette.length];
    const x = Math.max(0, Math.round(d.x * scale));
    const y = Math.max(0, Math.round(d.y * scale));
    const w = Math.max(1, Math.round(d.width * scale));
    const h = Math.max(1, Math.round(d.height * scale));

    const confPct = ((d.confidence || 0) * 100);
    const label = `${d.label || "object"} ${confPct.toFixed(0)}%`;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.95;
    ctx.strokeRect(x, y, w, h);

    ctx.globalAlpha = 0.10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.globalAlpha = 0.95;
    ctx.font = "900 13px Roboto, Tajawal, sans-serif";

    const padX = 8;
    const textW = Math.ceil(ctx.measureText(label).width);
    const boxH = 24;

    let lx = x;
    let ly = y - boxH - 6;
    if (ly < 4) ly = y + 6;

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.strokeStyle = "rgba(15,106,58,0.20)";
    ctx.lineWidth = 1;
    roundRect(ctx, lx, ly, textW + padX*2, boxH, 10, true, true);

    ctx.fillStyle = color;
    roundRect(ctx, lx + 6, ly + 7, 10, 10, 4, true, false);

    ctx.fillStyle = "rgba(15,26,20,0.92)";
    ctx.fillText(label, lx + 6 + 14 + 6, ly + 5);
  });

  ctx.restore();
}

function updateDetectionResult(data, file){
  const count    = data.count ?? (data.results?.length ?? 0);
  const topLabel = data.top_label ?? "—";
  const topConf  = (typeof data.top_confidence === "number") ? data.top_confidence : null;

  results.innerHTML = `
    ${renderMetaCards({
      modelName: "Object Detection",
      status: "Completed",
      inferenceMs: data.inference_ms,
      timestamp: data.timestamp
    })}
    <div class="chips">
      <span class="chip"><span class="dot"></span>Detections: ${count}</span>
      <span class="chip"><span class="dot"></span>Top: ${topLabel}${topConf!==null?` (${topConf.toFixed(1)}%)`:``}</span>
    </div>

    ${count > 0 ? `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Label</th>
            <th>Confidence</th>
            <th>Box</th>
          </tr>
        </thead>
        <tbody>
          ${(data.results || []).slice(0,10).map((d,i)=>`
            <tr>
              <td>#${i+1}</td>
              <td>${d.label}</td>
              <td>${((d.confidence||0)*100).toFixed(1)}%</td>
              <td>x:${d.x}, y:${d.y}, w:${d.width}, h:${d.height}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>` : `<div class="error">No objects detected.</div>`}
  `;

  const img = new Image();
  const reader = new FileReader();
  reader.onload = (e) => {
    img.onload = () => drawDetectionsOnCanvas(img, data.results || []);
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);

  segmentationImg.style.display = 'none';
}

/* =========================
   SEGMENTATION (Legend / Levels)
========================== */
function levelDescription(lvl){
  if (lvl <= 2)  return { en: "Very low (minor water presence)", ar: "منخفض جدًا (مياه بسيطة)" };
  if (lvl <= 4)  return { en: "Low (shallow water)",            ar: "منخفض (مياه ضحلة)" };
  if (lvl <= 6)  return { en: "Medium (noticeable water level)", ar: "متوسط (مستوى ملحوظ)" };
  if (lvl <= 8)  return { en: "High (potential hazard)",         ar: "مرتفع (خطر محتمل)" };
  if (lvl <= 10) return { en: "Very high (dangerous)",           ar: "مرتفع جدًا (خطر)" };
  return { en: "Extreme (severe flooding)",                      ar: "شديد جدًا (سيول قوية)" };
}

function friendlySegMeaning(className){
  const raw = (className || "").toLowerCase().trim();
  if (raw === "flood" || raw.includes("flood")) return "Flooded Area (Water-covered region) ";

  const m = raw.match(/level\s*(\d+)/);
  if (m){
    const lvl = parseInt(m[1], 10);
    const desc = levelDescription(lvl);
    return `Estimated Water Level (${lvl}) • ${desc.en} • ${desc.ar}`;
  }
  return "Region ";
}

function rgbFromBgr(bgr){
  if (!Array.isArray(bgr) || bgr.length < 3) return "rgb(0,0,0)";
  const [b,g,r] = bgr;
  return `rgb(${r},${g},${b})`;
}

function updateSegmentationResult(data){
  segmentationImg.style.display = 'block';
  segmentationImg.src = `${data.segmentation_url}?t=${Date.now()}`;
  canvas.style.display = 'none';

  if (data.error){
    results.innerHTML = `
      ${renderMetaCards({
        modelName: "Segmentation",
        status: "Failed",
        inferenceMs: data.inference_ms,
        timestamp: data.timestamp
      })}
      <div class="error">${data.error}</div>
    `;
    return;
  }

  const cls = Array.isArray(data.classes) ? data.classes : [];
  const legend = Array.isArray(data.legend) ? data.legend : [];

  const counts = {};
  cls.forEach(c=>{
    const name = c.class_name || "Unknown";
    counts[name] = (counts[name] || 0) + 1;
  });

  const regionCount = cls.length;
  const uniqueZones = Object.keys(counts).length;

  const topZones = Object.entries(counts)
    .sort((a,b)=> b[1]-a[1])
    .slice(0,3)
    .map(([k,v]) => `${k} (${v})`)
    .join(" • ") || "—";

  const legendHTML = legend.length ? `
    <div class="table-wrap" style="margin-top:10px;">
      <table>
        <thead>
          <tr>
            <th style="width:70px;">Color</th>
            <th>Zone</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          ${legend.map(item=>{
            const cname = item.class_name || `Class ${item.class_id}`;
            const meaning = friendlySegMeaning(cname);
            const color = rgbFromBgr(item.bgr);
            return `
              <tr>
                <td>
                  <span style="display:inline-block;width:18px;height:18px;border-radius:6px;background:${color};
                    border:1px solid rgba(15,26,20,0.18);"></span>
                </td>
                <td>${cname}</td>
                <td style="color: rgba(91,107,99,0.95); font-weight: 900;">${meaning}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  ` : `<div class="error">Legend not available for this segmentation output.</div>`;

  const levelInfoCard = `
    <div class="meter" style="margin-top:10px;">
      <div class="meter-title" style="gap:10px;">
        <span>What does “Level 1–12” mean?</span>
        <span style="font-weight:950;color:rgba(91,107,99,0.95);">Explanation</span>
      </div>

      <div style="font-size:12.8px;line-height:1.65;color:rgba(91,107,99,0.98);font-weight:900;">
        <div><b>Levels</b> are a simple scale used by the segmentation model to describe the <b>estimated water height</b> in detected areas.</div>
        <div style="margin-top:6px;"><b>Lower number</b> = shallow water • <b>Higher number</b> = deeper/more severe flooding.</div>
        <div style="margin-top:6px;opacity:0.9;">
          *This is an AI estimate (not a real measurement). Use it for awareness, not exact decisions.
        </div>
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;">
          <span class="chip"><span class="dot"></span>1–2: Very Low</span>
          <span class="chip"><span class="dot"></span>3–4: Low</span>
          <span class="chip"><span class="dot"></span>5–6: Medium</span>
          <span class="chip"><span class="dot"></span>7–8: High</span>
          <span class="chip"><span class="dot"></span>9–10: Very High</span>
          <span class="chip"><span class="dot"></span>11–12: Extreme</span>
        </div>
      </div>
    </div>
  `;

  results.innerHTML = `
    ${renderMetaCards({
      modelName: "Segmentation",
      status: "Completed",
      inferenceMs: data.inference_ms,
      timestamp: data.timestamp
    })}

    <div class="chips">
      <span class="chip"><span class="dot"></span>Detected Regions: ${regionCount}</span>
      <span class="chip"><span class="dot"></span>Unique Zones: ${uniqueZones}</span>
      <span class="chip"><span class="dot"></span>Top Zones: ${topZones}</span>
    </div>

    ${levelInfoCard}
    ${legendHTML}
  `;
}

/* =========================
   PROCESS IMAGE (Fetch)
========================== */
submitBtn.addEventListener('click', () => {
  if (!uploadedFile) {
    alert('Please upload an image!');
    return;
  }

  const formData = new FormData();
  formData.append('file', uploadedFile);
  formData.append('model', modelSelect.value);

  resetDisplay();
  setBusy(true, "Processing model…");

  fetch('/upload', { method: 'POST', body: formData })
    .then((response) => response.json())
    .then((data) => {
      if (data.error && !data.type){
        results.innerHTML = `<div class="error">${data.error}</div>`;
        showToast("Error");
        return;
      }

      if (data.type === 'classification') {
        updateClassificationResult(data, uploadedFile);
        showToast("Classification completed");
        confettiBurst();
      } else if (data.type === 'detection') {
        updateDetectionResult(data, uploadedFile);
        showToast("Detection completed");
        confettiBurst();
      } else if (data.type === 'segmentation') {
        updateSegmentationResult(data);
        showToast(data.error ? "Segmentation error" : "Segmentation completed");
        if (!data.error) confettiBurst();
      } else {
        results.innerHTML = `<div class="error">Unexpected response.</div>`;
        showToast("Unexpected response");
      }
    })
    .catch((err) => {
      console.error('Error:', err);
      results.innerHTML = `<div class="error">Request failed. Check server logs.</div>`;
      showToast("Request failed");
    })
    .finally(() => setBusy(false));
});

/* =========================
   RESULTS REVEAL ANIMATION
========================== */
(function hookResultsReveal(){
  const resultsEl = document.getElementById('results');
  if (!resultsEl) return;

  const observer = new MutationObserver(()=>{
    resultsEl.classList.remove('reveal');
    void resultsEl.offsetWidth;
    resultsEl.classList.add('reveal');
  });

  observer.observe(resultsEl, { childList: true, subtree: true });
})();

/* =========================
   DROPDOWN CONTROLLER
========================== */
(function initModelDropdown(){
  const select  = document.getElementById('model-select');
  const wrap    = document.getElementById('model-dropdown');
  const trigger = document.getElementById('model-trigger');
  const menu    = document.getElementById('model-menu');
  if (!select || !wrap || !trigger || !menu) return;

  const items   = Array.from(menu.querySelectorAll('.model-item'));
  const titleEl = document.getElementById('model-title');
  const subEl   = document.getElementById('model-sub');
  const iconEl  = document.getElementById('model-icon');
  if (!titleEl || !subEl || !iconEl) return;

  const meta = {
    classification: { title: 'Classification',   sub: 'Flood / No-Flood decision' },
    detection:      { title: 'Object Detection', sub: 'Detect key objects' },
    segmentation:   { title: 'Segmentation',     sub: 'Overlay flood regions' }
  };

  function setActive(value){
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    items.forEach(it => it.classList.toggle('active', it.dataset.value === value));
    titleEl.textContent = meta[value]?.title || value;
    subEl.textContent   = meta[value]?.sub || '';

    const chosen = items.find(it => it.dataset.value === value);
    if (chosen){
      const svg = chosen.querySelector('svg');
      if (svg) iconEl.innerHTML = svg.outerHTML;
    }
  }

  function openMenu(){
    wrap.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    wrap.style.zIndex = "99999";
  }

  function closeMenu(){
    wrap.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    wrap.style.zIndex = "";
  }

  function toggleMenu(){
    wrap.classList.contains('open') ? closeMenu() : openMenu();
  }

  setActive(select.value || 'classification');

  trigger.addEventListener('click', (e)=>{
    e.preventDefault();
    toggleMenu();
  });

  items.forEach(item=>{
    item.addEventListener('click', ()=>{
      const v = item.dataset.value;
      setActive(v);
      closeMenu();
      showToast(`Model: ${meta[v].title}`);
    });

    item.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        item.click();
      }
    });
  });

  document.addEventListener('click', (e)=>{
    if (!wrap.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeMenu();
  });
})();

/* =========================
   3D TILT (Content Only)
========================== */
(function init3DTilt(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const container = document.querySelector('.container');
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!container) return;

  let raf = null;

  function applyTilt(el, x, y, max=10){
    const rect = el.getBoundingClientRect();
    const px = (x - (rect.left + rect.width/2)) / (rect.width/2);
    const py = (y - (rect.top + rect.height/2)) / (rect.height/2);
    const rx = (-py * max);
    const ry = (px * max);
    el.style.transform = `translateY(-2px) perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function resetTilt(el){
    el.style.transform = '';
  }

  window.addEventListener('mousemove', (e)=>{
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=> applyTilt(container, e.clientX, e.clientY, 6));
  }, { passive:true });

  window.addEventListener('mouseleave', ()=> resetTilt(container));

  cards.forEach(card=>{
    card.addEventListener('mousemove', (e)=> applyTilt(card, e.clientX, e.clientY, 12));
    card.addEventListener('mouseleave', ()=> resetTilt(card));
  });
})();

/* =========================
   SCROLL TO TOP
========================== */

(function initToTop(){
  const btn = document.getElementById('toTop');
  if (!btn) return;

  const toggle = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    btn.classList.toggle('show', y > 380);
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();