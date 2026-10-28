/* =========================================================
   Clínica Provida — LISTA DO CORPO CLÍNICO
   ---------------------------------------------------------
   Para adicionar um profissional, copie um bloco { ... },
   cole na lista e troque os dados.

   especialidade: texto que aparece no card.
   area:          grupo do botão de filtro (ex.: "Psicologia").
                  Use sempre o mesmo nome para o mesmo grupo.
   registro:      CRM / CRP / CRN / CREFITO / RQE.
   foto:          arquivo em img/medicos/ (os recortes do rosto
                  ficam em img/medicos/site/, 600x720).
   itens:         opcional — lista que aparece no verso do card.
   ========================================================= */

const MEDICOS = [
  {
    nome: "Dr. Alfredo Alves",
    especialidade: "Angiologista",
    area: "Angiologia",
    registro: "CRM-BA 17509",
    foto: "site/alfredo-alves.jpg",
    itens: []
  },
  {
    nome: "Dr. Allan Bittencourt Vieira",
    especialidade: "Gastroenterologista, Endoscopista, Broncoscopista e Cirurgião Geral",
    area: "Gastroenterologia",
    registro: "CREMEB 52326 · RQE 30133 · RQE 30067",
    foto: "site/allan-bittencourt-vieira.jpg",
    itens: []
  },
  {
    nome: "Dr. Alípio Araújo",
    especialidade: "Gastroenterologista, Endoscopista e Cirurgião Geral",
    area: "Gastroenterologia",
    registro: "CRM-BA 52664",
    foto: "site/alipio-araujo.jpg",
    itens: []
  },
  {
    nome: "Dra. Ana Flávia",
    especialidade: "Fisioterapeuta",
    area: "Fisioterapia",
    registro: "CREFITO 401869-F",
    foto: "site/ana-flavia.jpg",
    itens: []
  },
  {
    nome: "Dr. Antônio Carlos",
    especialidade: "Oftalmologista",
    area: "Oftalmologia",
    registro: "CRM-BA 11.507",
    foto: "site/antonio-carlos.jpg",
    itens: []
  },
  {
    nome: "Dra. Camila Katiely",
    especialidade: "Neuropsicóloga",
    area: "Neuropsicologia",
    registro: "CRP 03/31288",
    foto: "site/camila-katiely.jpg",
    itens: []
  },
  {
    nome: "Chayheny Araújo",
    especialidade: "Psicóloga Clínica",
    area: "Psicologia",
    registro: "CRP 03/35077",
    foto: "site/chayheny-araujo.jpg",
    itens: []
  },
  {
    nome: "Cinara Rocha",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/7293",
    foto: "site/cinara-rocha.jpg",
    itens: []
  },
  {
    nome: "Dr. Cléber Castro Vieira",
    especialidade: "Gastroenterologista, Endoscopista, Colonoscopista e Cirurgião Geral",
    area: "Gastroenterologia",
    registro: "CRM-BA 15404 · RQE 18924 · RQE 6887 · RQE 20013",
    foto: "site/cleber-castro-vieira.jpg",
    itens: []
  },
  {
    nome: "Dra. Daniela Lacerda",
    especialidade: "Infectologista",
    area: "Infectologia",
    registro: "",
    foto: "site/daniela-lacerda.jpg",
    itens: []
  },
  {
    nome: "Deise Andrade",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/14457",
    foto: "site/deise-andrade.jpg",
    itens: []
  },
  {
    nome: "Dr. Edgar Augusto",
    especialidade: "Ortopedista",
    area: "Ortopedia",
    registro: "CRM-BA 18470",
    foto: "site/edgar-augusto.jpg",
    itens: []
  },
  {
    nome: "Dr. Edierk Dantas",
    especialidade: "Coloproctologista",
    area: "Coloproctologia",
    registro: "CRM-BA 24200",
    foto: "site/edierk-dantas.jpg",
    itens: []
  },
  {
    nome: "Dr. Eduardo Guedes",
    especialidade: "Avaliação e Diagnóstico",
    area: "Avaliação e Diagnóstico",
    registro: "CRM-BA 45.958",
    foto: "site/eduardo-guedes.jpg",
    itens: []
  },
  {
    nome: "Dr. Euler Donato",
    especialidade: "Reumatologista",
    area: "Reumatologia",
    registro: "CRM-BA 15.756",
    foto: "site/euler-donato.jpg",
    itens: []
  },
  {
    nome: "Dra. Eva Duarte",
    especialidade: "Endocrinologista e Metabologista",
    area: "Endocrinologia",
    registro: "CRM 31412 · RQE 21640",
    foto: "site/eva-duarte.jpg",
    itens: []
  },
  {
    nome: "Fernanda Oliveira",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/11068",
    foto: "site/fernanda-oliveira.jpg",
    itens: []
  },
  {
    nome: "Dr. Fillipe Bitencourt",
    especialidade: "Otorrinolaringologista",
    area: "Otorrinolaringologia",
    registro: "CRM 23802",
    foto: "site/fillipe-bitencourt.jpg",
    itens: []
  },
  {
    nome: "Gabriela Almeida",
    especialidade: "Nutricionista",
    area: "Nutrição",
    registro: "CRN5 3403",
    foto: "site/gabriela-almeida.jpg",
    itens: []
  },
  {
    nome: "Dra. Gabriela Gomes Ferreira",
    especialidade: "Médica Radiologista",
    area: "Radiologia",
    registro: "RQE 29064",
    foto: "site/gabriela-gomes-ferreira.jpg",
    itens: []
  },
  {
    nome: "Dra. Geisa Fraga",
    especialidade: "Dermatologista",
    area: "Dermatologia",
    registro: "CRM 54829",
    foto: "site/geisa-fraga.jpg",
    itens: []
  },
  {
    nome: "Dr. Gustavo Barreira",
    especialidade: "Anestesista",
    area: "Anestesiologia",
    registro: "CRM 31137 · RQE 22516",
    foto: "site/gustavo-barreira.jpg",
    itens: []
  },
  {
    nome: "Dra. Heloísa Cardoso",
    especialidade: "Neuropsicóloga",
    area: "Neuropsicologia",
    registro: "CRM 25300",
    foto: "site/heloisa-cardoso.jpg",
    itens: []
  },
  {
    nome: "Dr. Huan Scarcela",
    especialidade: "Gastroenterologista",
    area: "Gastroenterologia",
    registro: "CRM 30410",
    foto: "site/huan-scarcela.jpg",
    itens: []
  },
  {
    nome: "Dr. Hugo Oliveira",
    especialidade: "Psiquiatra",
    area: "Psiquiatria",
    registro: "CRM-BA 25.534",
    foto: "site/hugo-oliveira.jpg",
    itens: []
  },
  {
    nome: "Dra. Iana Manuella Abreu",
    especialidade: "Oftalmologista",
    area: "Oftalmologia",
    registro: "CRM-BA 30.078 · RQE 19.460",
    foto: "site/iana-manuella-abreu.jpg",
    itens: []
  },
  {
    nome: "Dra. Ivina Fialho",
    especialidade: "Reumatologista",
    area: "Reumatologia",
    registro: "CRM 24605",
    foto: "site/ivina-fialho.jpg",
    itens: []
  },
  {
    nome: "Dr. James Dean",
    especialidade: "Angiologista",
    area: "Angiologia",
    registro: "CRM-BA 28.230",
    foto: "site/james-dean.jpg",
    itens: []
  },
  {
    nome: "Josmar Cardoso",
    especialidade: "Psicólogo",
    area: "Psicologia",
    registro: "CRP 03/13641",
    foto: "site/josmar-cardoso.jpg",
    itens: []
  },
  {
    nome: "Dr. José Guedes",
    especialidade: "Anestesista",
    area: "Anestesiologia",
    registro: "CRM-BA 22.404",
    foto: "site/jose-guedes.jpg",
    itens: []
  },
  {
    nome: "Dra. Juliana Magalhães",
    especialidade: "Psiquiatra",
    area: "Psiquiatria",
    registro: "CRM 29.730",
    foto: "site/juliana-magalhaes.jpg",
    itens: []
  },
  {
    nome: "Dr. Juliano Chaves Cotrim",
    especialidade: "Clínico Geral",
    area: "Clínica Geral",
    registro: "CRM 43852",
    foto: "site/juliano-chaves-cotrim.jpg",
    itens: []
  },
  {
    nome: "Larissa Natalle",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/31874",
    foto: "site/larissa-natalle.jpg",
    itens: []
  },
  {
    nome: "Dr. Lenilson Prates",
    especialidade: "Cirurgião Geral e Urologista",
    area: "Cirurgia Geral",
    registro: "CRM-BA 33311 · RQE 23387",
    foto: "site/lenilson-prates.jpg",
    itens: []
  },
  {
    nome: "Dra. Lorena Martins",
    especialidade: "Alergologia e Imunopatologia",
    area: "Alergologia",
    registro: "CRM 45495",
    foto: "site/lorena-martins.jpg",
    itens: []
  },
  {
    nome: "Dra. Luana Lôbo Fernandes",
    especialidade: "Pediatra",
    area: "Pediatria",
    registro: "CRM 30.285",
    foto: "site/luana-lobo-fernandes.jpg",
    itens: []
  },
  {
    nome: "Dr. Lucas Lima",
    especialidade: "Neurologista",
    area: "Neurologia",
    registro: "CRM-BA 31048 · RQE 20287",
    foto: "site/lucas-lima.jpg",
    itens: []
  },
  {
    nome: "Dr. Marcos Lopes",
    especialidade: "Clínico Geral e Ultrassonografia",
    area: "Clínica Geral",
    registro: "CRM-BA 10.826",
    foto: "site/marcos-lopes.jpg",
    itens: []
  },
  {
    nome: "Dr. Marcus Carneiro",
    especialidade: "Pneumologista",
    area: "Pneumologia",
    registro: "CRM-BA 27138",
    foto: "site/marcus-carneiro.jpg",
    itens: []
  },
  {
    nome: "Maryana Pimentel",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/16293",
    foto: "site/maryana-pimentel.jpg",
    itens: []
  },
  {
    nome: "Dr. Mike Cardoso",
    especialidade: "Urologista",
    area: "Urologia",
    registro: "CRM 29754 · RQE 23109",
    foto: "site/mike-cardoso.jpg",
    itens: []
  },
  {
    nome: "Dra. Minelli Salles",
    especialidade: "Endocrinologista",
    area: "Endocrinologia",
    registro: "CRM 25300",
    foto: "site/minelli-salles.jpg",
    itens: []
  },
  {
    nome: "Dr. Murilo Morais",
    especialidade: "Cirurgião Geral",
    area: "Cirurgia Geral",
    registro: "CRM-BA 27131",
    foto: "site/murilo-morais.jpg",
    itens: []
  },
  {
    nome: "Dr. Nilton Brito",
    especialidade: "Ortopedista",
    area: "Ortopedia",
    registro: "CRM-BA 23.600",
    foto: "site/nilton-brito.jpg",
    itens: []
  },
  {
    nome: "Dr. Nivaldo Brandão",
    especialidade: "Neurocirurgião",
    area: "Neurocirurgia",
    registro: "CRM 6749",
    foto: "site/nivaldo-brandao.jpg",
    itens: []
  },
  {
    nome: "Dr. Paulo Ricardo",
    especialidade: "Pneumologista",
    area: "Pneumologia",
    registro: "CRM 19311",
    foto: "site/paulo-ricardo.jpg",
    itens: []
  },
  {
    nome: "Dr. Rodrigo Solto",
    especialidade: "Cirurgião Plástico",
    area: "Cirurgia Plástica",
    registro: "CRM 26539 · RQE 20104",
    foto: "site/rodrigo-solto.jpg",
    itens: []
  },
  {
    nome: "Silvia Lopes",
    especialidade: "Psicóloga",
    area: "Psicologia",
    registro: "CRP 03/18098",
    foto: "site/silvia-lopes.jpg",
    itens: []
  },
  {
    nome: "Dra. Thais Badaró",
    especialidade: "Reumatologista",
    area: "Reumatologia",
    registro: "CRM-BA 33886",
    foto: "site/thais-badaro.jpg",
    itens: []
  },
  {
    nome: "Dra. Vanessa Teixeira",
    especialidade: "Ginecologista",
    area: "Ginecologia",
    registro: "CRM-BA 37.177",
    foto: "site/vanessa-teixeira.jpg",
    itens: []
  },
  {
    nome: "Dr. Victor Lapa",
    especialidade: "Urologista",
    area: "Urologia",
    registro: "CRM-BA 19320 · RQE 11833",
    foto: "site/victor-lapa.jpg",
    itens: []
  },
  {
    nome: "Dr. Áureo Bonfim",
    especialidade: "Cardiologista",
    area: "Cardiologia",
    registro: "RQE 20.362 · 23.303",
    foto: "site/aureo-bonfim.jpg",
    itens: []
  },
  {
    nome: "Dr. Ézio Nunes",
    especialidade: "Neurologia e Neurologia Pediátrica",
    area: "Neurologia",
    registro: "CRM-BA 23382 · RQE 23382 · RQE 26731",
    foto: "site/ezio-nunes.jpg",
    itens: []
  }
];
