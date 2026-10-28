/* =========================================================
   Clínica Provida — scripts
   ========================================================= */

// >>> TROQUE AQUI pelo número do WhatsApp da clínica (DDI + DDD + número, só dígitos)
const WHATSAPP_NUMERO = "557798777720";

/* ---------- Analytics (Umami): registra eventos sem quebrar o site se o script não carregar ---------- */
function rastrear(evento, dados) {
  try { if (window.umami && typeof window.umami.track === "function") window.umami.track(evento, dados); } catch (e) { /* ignora */ }
}
// de qual parte do site veio o clique (id da seção mais próxima)
const origemDe = el => (el && el.closest("[id]") ? el.closest("[id]").id : "site");

function abrirWhatsApp(msg, origem) {
  rastrear("WhatsApp", { origem: origem || "site", mensagem: String(msg || "Olá!").slice(0, 80) });
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
      abrirWhatsApp(el.dataset.waMsg, origemDe(el));
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
    abrirWhatsApp(txt || "Olá!", "janela-whatsapp");
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
    rastrear("Formulário de contato", { especialidade: esp || "não informada" });
    abrirWhatsApp(texto, "formulario-contato");
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

  /* ---------- Corpo clínico: filtro + busca + slider (dados em js/medicos.js) ---------- */
  iniciarCorpoClinico();
});

/* =========================================================
   CORPO CLÍNICO — filtro por especialidade + busca + slider
   ========================================================= */
const AVATAR_PADRAO = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#dbe8fd"/><stop offset="1" stop-color="#a9c5f2"/></linearGradient></defs>' +
  '<rect width="300" height="400" fill="url(#g)"/><circle cx="150" cy="150" r="62" fill="#fff" opacity=".9"/>' +
  '<path d="M30 400c6-95 56-150 120-150s114 55 120 150z" fill="#fff" opacity=".9"/></svg>');

// Quantos botões de especialidade aparecem antes do "+ N especialidades" (desktop)
const CHIPS_VISIVEIS = 8;

const escaparHTML = txt => String(txt ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const normalizar = txt => String(txt ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function cardMedico(m, i) {
  const nome = escaparHTML(m.nome);
  const esp = escaparHTML(m.especialidade);
  const crm = escaparHTML(m.registro || m.crm);
  const foto = m.foto ? "img/medicos/" + encodeURI(m.foto) : AVATAR_PADRAO;
  const itens = (m.itens || []).map(t => `<li><i class="bi bi-check2-circle"></i>${escaparHTML(t)}</li>`).join("");
  const msg = escaparHTML(`Olá! Gostaria de agendar com ${m.nome} (${m.area || m.especialidade}).`);
  return `
    <div class="slide-medico" role="listitem">
      <div class="flip-card" tabindex="0" aria-label="${nome} — ver especialidades" data-nome="${nome}" data-area="${escaparHTML(m.area || m.especialidade)}">
        <div class="flip-inner">
          <div class="flip-front">
            <img src="${foto}" alt="${nome}" loading="${i < 4 ? "eager" : "lazy"}" onerror="this.onerror=null;this.src=AVATAR_PADRAO">
            <div class="corpo">
              <h5>${nome}</h5>
              <span class="esp">${esp}</span>
              ${crm ? `<span class="crm">${crm}</span>` : ""}
              <span class="dica"><span class="dica-desktop">Passe o mouse</span><span class="dica-mobile">Toque aqui</span> para ver mais <i class="bi bi-arrow-right"></i></span>
            </div>
          </div>
          <div class="flip-back">
            <h5>${nome}</h5>
            <div class="area">${esp}</div>
            ${crm ? `<div class="registro">${crm}</div>` : ""}
            ${itens ? `<ul>${itens}</ul>` : `<p class="verso-texto">Agende sua consulta com ${nome.split(" ").slice(0, 3).join(" ")} pelo nosso WhatsApp.</p>`}
            <a href="#" class="btn btn-light text-azul" data-wa-msg="${msg}">
              <i class="bi bi-whatsapp me-1"></i> Agendar consulta
            </a>
          </div>
        </div>
      </div>
    </div>`;
}

function iniciarCorpoClinico() {
  const slider = document.getElementById("sliderMedicos");
  const trilho = document.getElementById("trilhoMedicos");
  if (!slider || !trilho || typeof MEDICOS === "undefined") return;

  const busca = document.getElementById("buscaMedico");
  const chipsBox = document.getElementById("chipsEspecialidades");
  const vazio = document.getElementById("vazioMedicos");
  const btnAnt = slider.querySelector(".anterior");
  const btnProx = slider.querySelector(".proximo");
  const dotsBox = document.getElementById("dotsMedicos");
  const contador = document.getElementById("contadorMedicos");

  let filtroEsp = "";       // "" = todas
  let termo = "";
  let lista = MEDICOS;
  let chipsAbertos = false;

  /* ----- botões de especialidade (gerados a partir da lista) ----- */
  const contagem = {};
  const grupo = m => (m.area || m.especialidade || "").trim();
  MEDICOS.forEach(m => { const e = grupo(m); if (e) contagem[e] = (contagem[e] || 0) + 1; });
  // mais profissionais primeiro; empate em ordem alfabética
  const especialidades = Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a] || a.localeCompare(b, "pt-BR"));

  const montarChips = () => {
    const extras = especialidades.length - CHIPS_VISIVEIS;
    const chip = (valor, rotulo, qtd, oculto) =>
      `<button type="button" class="chip-esp${valor === filtroEsp ? " ativo" : ""}${oculto ? " chip-extra" : ""}" data-esp="${escaparHTML(valor)}" aria-pressed="${valor === filtroEsp}">${escaparHTML(rotulo)} <small>${qtd}</small></button>`;
    chipsBox.innerHTML =
      chip("", "Todos", MEDICOS.length, false) +
      especialidades.map((e, i) => chip(e, e, contagem[e], i >= CHIPS_VISIVEIS && e !== filtroEsp)).join("") +
      (extras > 0 ? `<button type="button" class="chip-esp chip-mais" aria-expanded="${chipsAbertos}">${chipsAbertos ? "Mostrar menos" : `+ ${extras} especialidades`}</button>` : "");
    chipsBox.classList.toggle("aberto", chipsAbertos);
  };

  chipsBox.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.classList.contains("chip-mais")) { chipsAbertos = !chipsAbertos; montarChips(); return; }
    filtroEsp = b.dataset.esp;
    rastrear("Filtro de especialidade", { especialidade: filtroEsp || "Todos" });
    montarChips();
    aplicarFiltro();
    // no celular, traz o botão escolhido para a vista
    chipsBox.querySelector(".chip-esp.ativo")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  let tBusca, tBuscaReg;
  busca?.addEventListener("input", () => {
    clearTimeout(tBusca);
    tBusca = setTimeout(() => { termo = normalizar(busca.value); aplicarFiltro(); }, 150);
    clearTimeout(tBuscaReg);
    tBuscaReg = setTimeout(() => {
      const t = busca.value.trim();
      if (t.length >= 3) rastrear("Busca de profissional", { termo: t.slice(0, 40), resultados: lista.length });
    }, 1500);
  });

  /* ----- filtro ----- */
  function aplicarFiltro() {
    lista = MEDICOS.filter(m =>
      (!filtroEsp || grupo(m) === filtroEsp) &&
      (!termo || normalizar([m.nome, m.especialidade, m.area, (m.itens || []).join(" ")].join(" ")).includes(termo)));
    trilho.innerHTML = lista.map(cardMedico).join("");
    trilho.scrollTo({ left: 0, behavior: "instant" });
    vazio.hidden = lista.length > 0;
    slider.hidden = lista.length === 0;
    qtdDots = -1;
    atualizar();
  }

  /* ----- cliques nos cards (giro no celular + botão WhatsApp) ----- */
  const semHover = window.matchMedia("(hover: none), (pointer: coarse)");
  trilho.addEventListener("click", e => {
    const wa = e.target.closest("[data-wa-msg]");
    if (wa) {
      e.preventDefault();
      const c = wa.closest(".flip-card");
      rastrear("Agendar com profissional", { profissional: c?.dataset.nome || "", especialidade: c?.dataset.area || "" });
      abrirWhatsApp(wa.dataset.waMsg, "card-profissional");
      return;
    }
    const card = e.target.closest(".flip-card");
    if (!card || !semHover.matches) return;
    const jaVirado = card.classList.contains("flipped");
    trilho.querySelectorAll(".flip-card.flipped").forEach(c => c.classList.remove("flipped"));
    if (!jaVirado) { card.classList.add("flipped"); rastrear("Ver detalhes do profissional", { profissional: card.dataset.nome || "" }); }
  });
  trilho.addEventListener("keydown", e => {
    const card = e.target.closest(".flip-card");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); card.classList.toggle("flipped"); }
  });

  /* ----- slider ----- */
  const larguraPasso = () => {
    const primeiro = trilho.children[0];
    if (!primeiro) return trilho.clientWidth || 1;
    const gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
    return primeiro.getBoundingClientRect().width + gap;
  };
  const gapTrilho = () => parseFloat(getComputedStyle(trilho).columnGap) || 0;
  const porPagina = () => Math.max(1, Math.floor((trilho.clientWidth + gapTrilho() + 2) / larguraPasso()));
  const paginas = () => Math.max(1, Math.ceil(lista.length / porPagina()));
  const indiceAtual = () => Math.round(trilho.scrollLeft / larguraPasso());
  const irPara = indice => trilho.scrollTo({ left: indice * larguraPasso(), behavior: "smooth" });

  let qtdDots = -1;
  const montarDots = () => {
    const n = paginas();
    if (n === qtdDots) return;
    qtdDots = n;
    dotsBox.innerHTML = "";
    for (let p = 0; p < n; p++) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Página ${p + 1} de ${n}`);
      b.addEventListener("click", () => { pausado = true; irPara(p * porPagina()); });
      dotsBox.appendChild(b);
    }
  };

  function atualizar() {
    const total = lista.length;
    montarDots();
    const pp = porPagina();
    const cabeTudo = pp >= total;
    const fim = cabeTudo || trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    const ini = Math.min(indiceAtual(), Math.max(0, total - pp));
    const pagina = fim ? qtdDots - 1 : Math.floor(ini / pp);
    [...dotsBox.children].forEach((d, i) => d.classList.toggle("ativo", i === pagina));
    btnAnt.disabled = trilho.scrollLeft <= 4;
    btnProx.disabled = fim;
    dotsBox.hidden = cabeTudo || qtdDots > 15; // muitas páginas (celular): fica só o contador
    slider.classList.toggle("sem-rolagem", cabeTudo);

    const primeiro = fim ? Math.max(1, total - pp + 1) : ini + 1;
    const ultimo = Math.min(total, primeiro + pp - 1);
    const onde = filtroEsp ? ` em <b>${escaparHTML(filtroEsp)}</b>` : "";
    const plural = total === 1 ? "profissional" : "profissionais";
    contador.innerHTML = !total ? "" :
      cabeTudo ? `${total} ${plural}${onde}` : `${primeiro === ultimo ? primeiro : primeiro + "–" + ultimo} de ${total} ${plural}${onde}`;
  }

  btnAnt.addEventListener("click", () => { pausado = true; irPara(Math.max(0, indiceAtual() - porPagina())); });
  btnProx.addEventListener("click", () => { pausado = true; irPara(indiceAtual() + porPagina()); });
  trilho.addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
  window.addEventListener("resize", atualizar);
  slider.addEventListener("keydown", e => {
    if (e.target.closest(".flip-card") && (e.key === "Enter" || e.key === " ")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); btnProx.click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); btnAnt.click(); }
  });

  /* ----- passa sozinho a cada 6s; para quando o visitante interage ----- */
  let pausado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visivel = false;
  ["pointerenter", "touchstart", "focusin", "wheel"].forEach(ev =>
    slider.addEventListener(ev, () => { pausado = true; }, { passive: true }));
  busca?.addEventListener("focus", () => { pausado = true; });
  chipsBox.addEventListener("click", () => { pausado = true; });
  new IntersectionObserver(ent => { visivel = ent[0].isIntersecting; }, { threshold: .4 }).observe(slider);
  setInterval(() => {
    if (pausado || !visivel || document.hidden || slider.hidden) return;
    irPara(btnProx.disabled ? 0 : indiceAtual() + porPagina());
  }, 6000);

  /* ----- formulário de contato: lista com todas as especialidades (ordem alfabética) ----- */
  const selEsp = document.getElementById("fEsp");
  if (selEsp) {
    const ordem = [...especialidades].sort((a, b) => a.localeCompare(b, "pt-BR"));
    selEsp.innerHTML = '<option value="">Especialidade desejada</option>' +
      ordem.map(e => `<option>${escaparHTML(e)}</option>`).join("") +
      '<option>Outra / não sei qual especialidade</option>';
  }

  /* ----- seção "Especialidades": cards pequenos e clicáveis (gerados da lista) ----- */
  const grade = document.getElementById("gradeEspecialidades");
  const btnVerEsp = document.getElementById("btnVerEsp");
  if (grade) {
    const ICONES = {
      "Psicologia": "chat-heart", "Gastroenterologia": "capsule", "Reumatologia": "person-walking",
      "Anestesiologia": "activity", "Angiologia": "droplet", "Cirurgia Geral": "scissors",
      "Clínica Geral": "clipboard2-pulse", "Endocrinologia": "clipboard2-data", "Neurologia": "lightning-charge",
      "Neuropsicologia": "puzzle", "Oftalmologia": "eye", "Ortopedia": "person-arms-up",
      "Pneumologia": "lungs", "Psiquiatria": "chat-square-heart", "Urologia": "gender-male",
      "Alergologia": "flower1", "Avaliação e Diagnóstico": "search-heart", "Cardiologia": "heart-pulse",
      "Cirurgia Plástica": "stars", "Coloproctologia": "clipboard2-plus", "Dermatologia": "droplet-half",
      "Fisioterapia": "universal-access", "Ginecologia": "gender-female", "Infectologia": "virus",
      "Neurocirurgia": "bandaid", "Nutrição": "apple", "Otorrinolaringologia": "ear",
      "Pediatria": "emoji-smile", "Radiologia": "file-earmark-medical"
    };
    grade.innerHTML = especialidades.map(e => `
      <button type="button" class="esp-card" data-esp="${escaparHTML(e)}" aria-label="Ver profissionais de ${escaparHTML(e)}">
        <i class="bi bi-${ICONES[e] || "plus-circle"} esp-icone"></i>
        <span class="esp-nome">${escaparHTML(e)}</span>
        <small class="esp-qtd">${contagem[e]} ${contagem[e] === 1 ? "profissional" : "profissionais"}</small>
        <span class="esp-ver">Ver profissionais <i class="bi bi-chevron-right"></i></span>
        <i class="bi bi-chevron-right esp-seta" aria-hidden="true"></i>
      </button>`).join("");

    grade.addEventListener("click", e => {
      const card = e.target.closest(".esp-card");
      if (!card) return;
      filtroEsp = card.dataset.esp; termo = ""; if (busca) busca.value = "";
      rastrear("Card de especialidade", { especialidade: filtroEsp });
      montarChips(); aplicarFiltro();
      document.getElementById("medicos").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Mostra só as primeiras; o botão abre todas
    let abertas = false;
    const atualizarGrade = () => {
      grade.classList.toggle("aberta", abertas);
      btnVerEsp.hidden = especialidades.length <= 6;
      btnVerEsp.innerHTML = abertas
        ? 'Mostrar menos <i class="bi bi-chevron-up"></i>'
        : `Ver todas as ${especialidades.length} especialidades <i class="bi bi-chevron-down"></i>`;
    };
    // No celular o nome fica em uma linha só: se não couber, a fonte diminui um pouco até caber
    const ajustarNomes = () => {
      grade.querySelectorAll(".esp-nome").forEach(el => {
        el.style.fontSize = ""; el.style.whiteSpace = "";
        if (!el.offsetParent) return; // card escondido
        let tam = parseFloat(getComputedStyle(el).fontSize);
        while (el.scrollWidth > el.clientWidth + 0.5 && tam > 9) { tam -= 0.5; el.style.fontSize = tam + "px"; }
        // nome muito longo em tela muito estreita: último recurso, deixa ir para 2 linhas (nunca corta)
        el.style.whiteSpace = el.scrollWidth > el.clientWidth + 0.5 ? "normal" : "";
      });
    };
    let tAjuste;
    window.addEventListener("resize", () => { clearTimeout(tAjuste); tAjuste = setTimeout(ajustarNomes, 120); });
    document.fonts?.ready.then(ajustarNomes);

    btnVerEsp.addEventListener("click", () => {
      abertas = !abertas; atualizarGrade(); ajustarNomes();
      if (!abertas) document.getElementById("especialidades").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    atualizarGrade();
    ajustarNomes();
  }

  montarChips();
  aplicarFiltro();
}
