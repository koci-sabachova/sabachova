(() => {
  const taglines = [
    "How can I help you?",
    "Bez měsíčních poplatků. Bez závislosti na cizí platformě.",
    "Kód nepíšu ručně a nedělám z toho tajemství.",
    "Appka na míru je lepší než další tabulka v Google Sheets.",
  ];

  const tagEl = document.getElementById("tagline");
  const avatar = document.getElementById("avatar");
  const confettiLayer = document.getElementById("confetti-layer");
  const colors = ["#041562", "#11468f", "#da1212", "#eeeeee"];

  let i = 0;

  function nextTagline() {
    if (!tagEl) return;
    i = (i + 1) % taglines.length;
    tagEl.textContent = taglines[i];
  }

  function burstConfetti(originX, originY) {
    for (let n = 0; n < 24; n++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const size = 6 + Math.random() * 6;
      piece.style.width = size + "px";
      piece.style.height = size * 0.6 + "px";
      piece.style.background = colors[n % colors.length];
      piece.style.left = originX + "px";
      piece.style.top = originY + "px";
      piece.style.setProperty("--dx", (Math.random() * 260 - 130) + "px");
      piece.style.setProperty("--dy", -(80 + Math.random() * 180) + "px");
      piece.style.animationDuration = 0.8 + Math.random() * 0.6 + "s";
      confettiLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove());
    }
  }

  if (avatar) {
    avatar.addEventListener("click", () => {
      const rect = avatar.getBoundingClientRect();
      nextTagline();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  const emojiField = document.querySelector(".emoji-field");

  if (emojiField) {
    emojiField.addEventListener("click", (e) => {
      const kac = e.target.closest(".ef-kac");
      if (!kac) return;
      const rect = kac.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  }

  if (emojiField) {
    const emojis = ["☀️","🍸","🫶🏻","👌🏻","🐱","🌳","🍄","🌿","🌱","🌹","🌸","🌻","✨","🍊","🥨","🍋","🍕","🍿","🏓","🚴🏻‍♀️","🚂","🚅","⛰️","📎","📚","📦","🪔","⏰","📷","💻","🚲","🪸","🦩","🐓","🐈‍⬛","🦆","👩🏻‍💻","🍦","🦷","🧶","🪡","🎒","🐝","🫛","🍳"];
    const pool = [...emojis, "__kac__", "__kac__"];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const cellPx = 4 * 17;
    const cols = Math.ceil(emojiField.offsetWidth / cellPx) + 2;
    const rows = Math.ceil(emojiField.offsetHeight / cellPx) + 2;
    const count = Math.max(cols * rows, 200);
    let html = "";
    for (let i = 0; i < count; i++) {
      const item = pool[i % pool.length];
      html += item === "__kac__"
        ? '<img src="kac_emoji.png" alt="" class="ef-kac">'
        : "<span>" + item + "</span>";
    }
    emojiField.innerHTML = html;
  }
  function fixTypo(root = document.body) {
    const re = /(?<=\s|^)(k|s|v|z|a|i|o|u|na|do|po|od|za|ve|ze|ke|se|si|je|či|že|by|při|pro)\s/gi;
    const walk = node => {
      if (node.nodeType === 3) {
        node.nodeValue = node.nodeValue.replace(re, m => m.trimEnd() + ' ');
      } else if (!/^(SCRIPT|STYLE|CODE|PRE)$/.test(node.tagName)) {
        node.childNodes.forEach(walk);
      }
    };
    walk(root);
  }

  fixTypo();

  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lightbox-img');
  const lbCaption = lb.querySelector('.lightbox-caption');
  const lbPrev = lb.querySelector('.lightbox-prev');
  const lbNext = lb.querySelector('.lightbox-next');
  let lbImages = [], lbIndex = 0;

  let lbCaptions = [];

  function lbShow(i) {
    lbIndex = i;
    lbImg.src = lbImages[i];
    const hasMultiple = lbImages.length > 1;
    lbPrev.style.display = hasMultiple && i > 0 ? '' : 'none';
    lbNext.style.display = hasMultiple && i < lbImages.length - 1 ? '' : 'none';
    lbCaption.textContent = lbCaptions[i] || '';
  }

  function lbClose() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  }

  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lbImages = btn.dataset.preview.split(',');
      lbCaptions = (btn.dataset.captions || '').split(',');
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      lbShow(0);
    });
  });
  lb.querySelector('.lightbox-close').addEventListener('click', lbClose);
  lbPrev.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex - 1); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); lbShow(lbIndex + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
})();
