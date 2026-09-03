(() => {
  const taglines = [
    "Stavím weby vlastníma rukama — bez frameworků, bez zbytečností.",
    "Žádný React. Žádný build systém. Jen HTML, CSS a trocha JS.",
    "Zero dependencies znamená, že web bude fungovat i za 10 let.",
    "Klikni ještě jednou, uvidíš že se nic nerozbije. Tak píšu kód.",
    "Design i kód dělám ručně, od první čárky.",
  ];

  const tagEl = document.getElementById("tagline");
  const avatar = document.getElementById("avatar");
  const confettiLayer = document.getElementById("confetti-layer");
  const colors = ["#ffc93c", "#ff6b5b", "#2ec4b6", "#7c5cff"];

  let i = 0;

  function nextTagline() {
    i = (i + 1) % taglines.length;
    tagEl.textContent = taglines[i];
  }

  function burstConfetti() {
    const rect = avatar.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let n = 0; n < 24; n++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      const size = 6 + Math.random() * 6;
      piece.style.width = size + "px";
      piece.style.height = size * 0.6 + "px";
      piece.style.background = colors[n % colors.length];
      piece.style.left = originX + (Math.random() * 160 - 80) + "px";
      piece.style.top = originY + "px";
      piece.style.animationDuration = 1.4 + Math.random() * 1.2 + "s";
      confettiLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove());
    }
  }

  avatar.addEventListener("click", () => {
    nextTagline();
    burstConfetti();
  });
})();
