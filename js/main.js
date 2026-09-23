/* =========================================================
   Clínica Provida — scripts
   ========================================================= */

// >>> TROQUE AQUI pelo número do WhatsApp da clínica (DDI + DDD + número, só dígitos)
const WHATSAPP_NUMERO = "557798777720";

function abrirWhatsApp(msg) {
  const url = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(msg || "Olá!");
  window.open(url, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();

  /* ---------- Qualquer elemento com data-wa-msg abre o WhatsApp ---------- */
  document.querySelectorAll("[data-wa-msg]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation(); // não desvira o card ao clicar no botão
      abrirWhatsApp(el.dataset.waMsg);
    });
  });

  /* ---------- Cards dos médicos: toque (mobile) / Enter (teclado) ---------- */
  const semHover = window.matchMedia("(hover: none), (pointer: coarse)");
  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => {
      if (!semHover.matches) return; // no desktop o giro é pelo hover
      const jaVirado = card.classList.contains("flipped");
      document.querySelectorAll(".flip-card.flipped").forEach(c => c.classList.remove("flipped"));
      if (!jaVirado) card.classList.add("flipped");
    });
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });

  /* ---------- Fecha o menu mobile ao clicar num link ---------- */
  const menu = document.getElementById("menu");
  document.querySelectorAll("#menu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  /* ---------- Botão voltar ao topo ---------- */
  const btnTopo = document.getElementById("btnTopo");
  const rodape = document.querySelector("footer");
  const aoRolar = () => {
    btnTopo.classList.toggle("visivel", window.scrollY > 300);
    const rodapeVisivel = rodape.getBoundingClientRect().top < window.innerHeight;
    btnTopo.classList.toggle("no-rodape", rodapeVisivel);
  };
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();
  btnTopo.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- WhatsApp interativo ---------- */
  const waBtn = document.getElementById("waBtn");
  const waJanela = document.getElementById("waJanela");
  const waBalao = document.getElementById("waBalao");
  const badge = waBtn.querySelector(".badge-wa");

  const alternarJanela = abrir => {
    waJanela.classList.toggle("aberta", abrir);
    waBalao.classList.remove("mostrar");
    if (abrir && badge) badge.remove();
    waBtn.innerHTML = abrir ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-whatsapp"></i>';
  };
  waBtn.addEventListener("click", () => alternarJanela(!waJanela.classList.contains("aberta")));
  document.getElementById("waFechar").addEventListener("click", () => alternarJanela(false));

  document.getElementById("waForm").addEventListener("submit", e => {
    e.preventDefault();
    const txt = document.getElementById("waTexto").value.trim();
    abrirWhatsApp(txt || "Olá!");
  });

  // Balão de saudação aparece após 3s e some após 8s
  setTimeout(() => {
    if (!waJanela.classList.contains("aberta")) waBalao.classList.add("mostrar");
    setTimeout(() => waBalao.classList.remove("mostrar"), 8000);
  }, 3000);

  /* ---------- Formulário de contato -> WhatsApp ---------- */
  document.getElementById("formContato").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("fNome").value.trim();
    const tel = document.getElementById("fTel").value.trim();
    const esp = document.getElementById("fEsp").value;
    const msg = document.getElementById("fMsg").value.trim();
    let texto = `Olá! Meu nome é ${nome}.\nTelefone: ${tel}`;
    if (esp) texto += `\nEspecialidade: ${esp}`;
    if (msg) texto += `\nMensagem: ${msg}`;
    abrirWhatsApp(texto);
  });

  /* ---------- Contador animado (seção Sobre) ---------- */
  const contadores = document.querySelectorAll("[data-contar]");
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(ent => {
      if (!ent.isIntersecting) return;
      const el = ent.target, alvo = +el.dataset.contar, sufixo = el.dataset.sufixo || "+";
      let atual = 0;
      const passo = Math.max(1, Math.ceil(alvo / 40));
      const t = setInterval(() => {
        atual = Math.min(alvo, atual + passo);
        el.textContent = atual + (atual === alvo ? sufixo : "");
        if (atual === alvo) clearInterval(t);
      }, 35);
      obs.unobserve(el);
    });
  }, { threshold: .5 });
  contadores.forEach(c => obs.observe(c));
});
