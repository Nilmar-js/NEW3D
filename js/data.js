/* New3D — Catálogo de produtos
   Cada produto tem: id, nome, categoria, preco, material, tempoImpressao (h),
   altura (mm), descricao, icone e imagens (fotos reais). */

const CATEGORIAS = [
  { slug: "decoracao", nome: "Decoração" },
  { slug: "casa", nome: "Utilidades / Casa" },
  { slug: "gadgets", nome: "Gadgets / Tecnologia" },
  { slug: "personalizados", nome: "Presentes / Personalizados" },
  { slug: "geek", nome: "Colecionáveis / Geek" },
  { slug: "infantil", nome: "Infantil / Educativo" },
  { slug: "fidget", nome: "Fidget Toys" },
];

const PRODUTOS = [
  // Decoração
  { id: 1, nome: "Vaso Geométrico Facetado", categoria: "decoracao", preco: 59.9, material: "PLA", tempo: 6, altura: 180, icone: "vaso", imagens: ["https://makerworld.bblmw.com/makerworld/model/US98c82d69e1a34d/design/9ee6d07fb24cc9b6.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Vaso com faces facetadas inspiradas em geometria poliédrica. Acabamento fosco, ideal para suculentas ou flores secas." },
  { id: 2, nome: "Luminária Voronoi", categoria: "decoracao", preco: 119.9, material: "PETG", tempo: 10, altura: 220, icone: "luminaria", imagens: ["https://makerworld.bblmw.com/makerworld/model/USfbe86a299ede9/design/2025-09-16_ab177288f22248.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Abajur com padrão orgânico tipo Voronoi que projeta sombras na parede. Acompanha soquete E27." },
  { id: 3, nome: "Porta-Retrato Modular Trio", categoria: "decoracao", preco: 44.9, material: "PLA", tempo: 4, altura: 150, icone: "retrato", imagens: ["https://makerworld.bblmw.com/makerworld/model/US514aebc28a2f63/design/7dc4b1a1169b8b18.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Três molduras encaixáveis que formam composições diferentes na mesa ou estante." },
  { id: 4, nome: "Escultura Abstrata Fluxo", categoria: "decoracao", preco: 119.9, material: "PLA Seda", tempo: 8, altura: 200, icone: "escultura", imagens: ["https://makerworld.bblmw.com/makerworld/model/US349b95b6a11f61/design/2026-01-15_14d0460b800f28.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Peça escultural com curvas contínuas, impressa em filamento com acabamento sedoso." },
  { id: 5, nome: "Suporte para Velas Facetado", categoria: "decoracao", preco: 49.9, material: "PLA", tempo: 3, altura: 90, icone: "vela", imagens: ["https://makerworld.bblmw.com/makerworld/model/US9637bfb757b27e/design/749397ed6261c09d.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Trio de suportes facetados para velas de diferentes alturas, criando composição na mesa." },

  // Utilidades / Casa
  { id: 6, nome: "Organizador de Mesa Grid", categoria: "casa", preco: 49.9, material: "PETG", tempo: 5, altura: 80, icone: "organizador", imagens: ["https://makerworld.bblmw.com/makerworld/model/US10db522ab25556/design/f6c9350046b99e7d.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Divisórias em grade para canetas, clipes e celular, com encaixe modular." },
  { id: 7, nome: "Suporte para Suculentas Hexa", categoria: "casa", preco: 49.9, material: "PLA", tempo: 4, altura: 70, icone: "planta", imagens: ["https://makerworld.bblmw.com/makerworld/model/DSM00000001048000/design/2025-01-28_ba92f20d1361f.webp?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Módulos hexagonais empilháveis para pequenas suculentas, formam painel na parede." },
  { id: 8, nome: "Gancho Modular de Parede (kit 3)", categoria: "casa", preco: 39.9, material: "PETG", tempo: 2, altura: 60, icone: "gancho", imagens: ["https://makerworld.bblmw.com/makerworld/model/USa7b07d8f49d557/design/2025-10-14_e28d34768f6bd.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Kit com três ganchos de encaixe rápido para chaves, casacos e utensílios." },
  { id: 9, nome: "Porta-Controle Remoto Trio", categoria: "casa", preco: 35.9, material: "PLA", tempo: 3, altura: 100, icone: "controle", imagens: ["https://makerworld.bblmw.com/makerworld/model/US9c399cde428ecb/design/2024-03-05_eb93650a37701.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Suporte de mesa ou parede para três controles remotos, com apoio para celular." },

  // Gadgets / Tecnologia
  { id: 10, nome: "Suporte para Celular/Tablet Ajustável", categoria: "gadgets", preco: 39.9, material: "PETG", tempo: 4, altura: 140, icone: "celular", imagens: ["https://makerworld.bblmw.com/makerworld/model/USb7568d97a23a10/design/2025-04-04_42a0ab445252e8.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Ângulo ajustável em três posições, compatível com celulares e tablets de até 11 polegadas." },
  { id: 11, nome: "Suporte para Fones Orbit", categoria: "gadgets", preco: 49.9, material: "PLA", tempo: 3, altura: 200, icone: "fone", imagens: ["https://makerworld.bblmw.com/makerworld/model/US620d14be2afc2a/design/2025-05-03_cf3c2f523322f8.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Suporte de mesa com base circular estável para headsets e fones over-ear." },
  { id: 12, nome: "Suporte para Notebook Elevado", categoria: "gadgets", preco: 89.9, material: "PETG", tempo: 6, altura: 130, icone: "notebook", imagens: ["https://makerworld.bblmw.com/makerworld/model/USf95dcd53ed3c7b/design/2025-04-24_c8e9fb9bcc23.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Eleva o notebook para melhorar a ventilação e a ergonomia de uso, com vãos de ventilação." },

  // Presentes / Personalizados
  { id: 13, nome: "Chaveiro Personalizado com Nome", categoria: "personalizados", preco: 9.9, material: "PLA", tempo: 1, altura: 60, icone: "chaveiro", imagens: ["https://makerworld.bblmw.com/makerworld/model/US1e2d62a65ed32/design/2025-03-27_6274d8fa83528.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Chaveiro impresso com o nome ou palavra de sua escolha. Informe o texto no carrinho." },
  { id: 14, nome: "Placa com Nome/Frase Sob Medida", categoria: "personalizados", preco: 34.9, material: "PLA", tempo: 2, altura: 100, icone: "placa", imagens: ["https://makerworld.bblmw.com/makerworld/model/US58cc10e6005ae8/design/dd36c837d0992be2.jfif?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Placa de mesa ou porta com texto personalizado, várias fontes disponíveis." },
  { id: 15, nome: "Chaveiro Corporativo (sua logo)", categoria: "personalizados", preco: 9.9, material: "PLA", tempo: 1, altura: 60, icone: "chaveiro", imagens: ["https://makerworld.bblmw.com/makerworld/model/US9187ddfd1f6f6d/design/54655e05c7ab772f.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Chaveiro com a logo da sua empresa em relevo, ótimo para brindes." },

  // Colecionáveis / Geek
  { id: 16, nome: "Patolino x Kratos", categoria: "geek", preco: 119.9, material: "pla", tempo: 5, altura: 90, icone: "miniatura", imagens: ["https://makerworld.bblmw.com/makerworld/model/US69a229927c957d/design/ef02c4f5b0f78ab1.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Miniatura autoral de guerreiro fantasia, escala 1:24, pronta para pintar." },
  { id: 17, nome: "Cenário Modular de Exibição", categoria: "geek", preco: 94.9, material: "PLA", tempo: 7, altura: 120, icone: "cenario", imagens: ["https://makerworld.bblmw.com/makerworld/model/USbaddb43418eef0/design/ac74c76f41174a00.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Base modular com ruínas e terreno para exibir miniaturas ou dioramas." },

  // Infantil / Educativo
  { id: 18, nome: "Blocos de Encaixe Criativos", categoria: "infantil", preco: 39.9, material: "PLA", tempo: 4, altura: 40, icone: "blocos", imagens: ["https://makerworld.bblmw.com/makerworld/model/USd60c2eeae181f5/design/2023-11-20_2adb7f01d447b.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Kit de blocos coloridos e seguros para encaixar, estimula coordenação motora." },
  { id: 19, nome: "Quebra-Cabeça 3D Geométrico", categoria: "infantil", preco: 34.9, material: "PLA", tempo: 3, altura: 50, icone: "quebracabeca", imagens: ["https://makerworld.bblmw.com/makerworld/model/DSM00000001485227/design/2025-06-04_2483a815fd5c8.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Peças geométricas que se encaixam formando um cubo, treina raciocínio espacial." },
  { id: 20, nome: "Kit Formas Geométricas Educativas", categoria: "infantil", preco: 29.9, material: "PLA", tempo: 3, altura: 50, icone: "formas", imagens: ["https://makerworld.bblmw.com/makerworld/model/US26f394702237a1/design/458952ca2eea0eb9.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Conjunto de sólidos geométricos (cubo, esfera, pirâmide, cone) para uso escolar." },

  // Fidget Toys
  { id: 21, nome: "Fidget Cube Modular", categoria: "fidget", preco: 19.9, material: "PETG", tempo: 3, altura: 30, icone: "fidgetcube", imagens: ["https://makerworld.bblmw.com/makerworld/model/US66f5f9748457c1/design/2025-11-03_696e2e2e9a242.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Cubo com botão, engrenagem, roda e switch em cada face, para mexer sem parar." },
  { id: 22, nome: "Infinity Cube Articulado", categoria: "fidget", preco: 19.9, material: "PLA", tempo: 3, altura: 40, icone: "infinitycube", imagens: ["https://makerworld.bblmw.com/makerworld/model/US623e7691a8992c/design/2026-01-06_61b21aad1c87b.gif?x-oss-process=image%2Fformat%2Cwebp", "https://makerworld.bblmw.com/makerworld/model/USf5f7de70c682e0/design/cea22778baac70bd.jpg?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Cubo articulado que se dobra infinitamente sobre si mesmo, ótimo pra ansiedade e foco." },
  { id: 23, nome: "Spinner Geométrico", categoria: "fidget", preco: 29.9, material: "PETG", tempo: 2, altura: 80, icone: "spinner", imagens: ["https://makerworld.bblmw.com/makerworld/model/US13a07a7b256eb9/design/2024-12-12_c152408d50d6c.gif?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Spinner com rolamento embutido e design facetado, gira por vários minutos." },
  { id: 24, nome: "Corrente Fidget Articulada", categoria: "fidget", preco: 25.9, material: "PLA", tempo: 2, altura: 200, icone: "correntefidget", imagens: ["https://makerworld.bblmw.com/makerworld/model/US5a45a9e6b9c4f1/design/c8ad387f172453be.gif?x-oss-process=image/resize,w_1000/format,webp"],
    descricao: "Corrente de elos impressos já conectados, sem precisar de montagem, pra mexer com as mãos." },
  { id: 25, nome: "Pop-it 3D Reutilizável", categoria: "fidget", preco: 19.9, material: "TPU (flexível)", tempo: 4, altura: 15, icone: "popit", imagens: ["https://makerworld.bblmw.com/makerworld/model/US6fc595bfae08dc/design/2025-05-10_f35fb1b10732f8.gif?x-oss-process=image/resize,w_1000/format,webp"],
    descricao: "Versão impressa e flexível do clássico pop-it, com bolhas que voltam ao lugar." },

  // Extras / mais vendidos
  { id: 26, nome: "Placa Decorativa Ore e Confie", categoria: "decoracao", preco: 25.9, material: "PLA", tempo: 3, altura: 150, icone: "placa", imagens: ["https://makerworld.bblmw.com/makerworld/model/US988c6edf47b21f/design/053170c34b336267.png?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Placa decorativa com a frase \"Ore e Confie\", ótima para parede, estante ou de presente" },
  { id: 27, nome: "Suporte para Latinha de Cerveja", categoria: "casa", preco: 89.9, material: "PETG", tempo: 2, altura: 90, icone: "controle", imagens: ["https://makerworld.bblmw.com/makerworld/model/US8c61c12102f814/design/ad9e9fd97e1c51a7.png?x-oss-process=image/resize,w_1000/format,webp"],
    descricao: "Suporte avulso para latinha de cerveja, mantém a bebida estável e ajuda a isolar o calor da mão." },
  { id: 28, nome: "Suporte para Latinha Monster Energético", categoria: "casa", preco: 49.9, material: "PETG", tempo: 2, altura: 100, icone: "controle", imagens: ["https://makerworld.bblmw.com/makerworld/model/US94ecba6a512bd5/design/2025-07-27_feb0a7e528e628.webp?x-oss-process=image%2Fformat%2Cwebp"],
    descricao: "Suporte avulso pensado para as latinhas altas de energético, encaixe firme e base antiderrapante." },
];

function getProdutoPorId(id) {
  return PRODUTOS.find((p) => p.id === Number(id));
}

function getNomeCategoria(slug) {
  const c = CATEGORIAS.find((c) => c.slug === slug);
  return c ? c.nome : slug;
}

/* Retorna a lista de imagens reais do produto, ou null se ele ainda não tiver fotos
   cadastradas (nesse caso, quem chamou deve usar o ícone SVG como alternativa). */
function getImagensProduto(produto) {
  return produto.imagens && produto.imagens.length ? produto.imagens : null;
}
