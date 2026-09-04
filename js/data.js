/* New3D — Catálogo de produtos
   Cada produto tem: id, nome, categoria, preco, material, tempoImpressao (h),
   altura (mm), descricao, icone (forma usada no SVG de fallback) e imagens (fotos reais).

   COMO ADICIONAR FOTOS REAIS DE UM PRODUTO:
   1. Salve as fotos em img/produtos/, nomeadas como "{id}-1.jpg", "{id}-2.jpg", "{id}-3.jpg"...
      Ex.: produto id 1 -> img/produtos/1-1.jpg, img/produtos/1-2.jpg, img/produtos/1-3.jpg
   2. Preencha o campo "imagens" do produto com esses caminhos, na ordem que quiser exibir.
      Pode colocar 1, 2, 3 ou mais fotos — o site já cria o carrossel sozinho.
   3. Se "imagens" ficar vazio ([]), o card continua mostrando o ícone azulado (fallback),
      então nada quebra enquanto você ainda não tem foto de todos os produtos.
   Dica de tamanho: fotos quadradas (ex: 900x900px) ficam melhores nos cards. */

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
  { id: 1, nome: "Vaso Geométrico Facetado", categoria: "decoracao", preco: 79.9, material: "PLA", tempo: 6, altura: 180, icone: "vaso", imagens: [],
    descricao: "Vaso com faces facetadas inspiradas em geometria poliédrica. Acabamento fosco, ideal para suculentas ou flores secas." },
  { id: 2, nome: "Luminária Voronoi", categoria: "decoracao", preco: 149.9, material: "PETG", tempo: 10, altura: 220, icone: "luminaria", imagens: [],
    descricao: "Abajur com padrão orgânico tipo Voronoi que projeta sombras na parede. Acompanha soquete E27." },
  { id: 3, nome: "Porta-Retrato Modular Trio", categoria: "decoracao", preco: 64.9, material: "PLA", tempo: 4, altura: 150, icone: "retrato", imagens: [],
    descricao: "Três molduras encaixáveis que formam composições diferentes na mesa ou estante." },
  { id: 4, nome: "Escultura Abstrata Fluxo", categoria: "decoracao", preco: 119.9, material: "PLA Seda", tempo: 8, altura: 200, icone: "escultura", imagens: [],
    descricao: "Peça escultural com curvas contínuas, impressa em filamento com acabamento sedoso." },
  { id: 5, nome: "Suporte para Velas Facetado", categoria: "decoracao", preco: 49.9, material: "PLA", tempo: 3, altura: 90, icone: "vela", imagens: [],
    descricao: "Trio de suportes facetados para velas de diferentes alturas, criando composição na mesa." },

  // Utilidades / Casa
  { id: 6, nome: "Organizador de Mesa Grid", categoria: "casa", preco: 69.9, material: "PETG", tempo: 5, altura: 80, icone: "organizador", imagens: [],
    descricao: "Divisórias em grade para canetas, clipes e celular, com encaixe modular." },
  { id: 7, nome: "Suporte para Suculentas Hexa", categoria: "casa", preco: 54.9, material: "PLA", tempo: 4, altura: 70, icone: "planta", imagens: [],
    descricao: "Módulos hexagonais empilháveis para pequenas suculentas, formam painel na parede." },
  { id: 8, nome: "Gancho Modular de Parede (kit 3)", categoria: "casa", preco: 39.9, material: "PETG", tempo: 2, altura: 60, icone: "gancho", imagens: [],
    descricao: "Kit com três ganchos de encaixe rápido para chaves, casacos e utensílios." },
  { id: 9, nome: "Porta-Controle Remoto Duo", categoria: "casa", preco: 44.9, material: "PLA", tempo: 3, altura: 100, icone: "controle", imagens: [],
    descricao: "Suporte de mesa ou parede para dois controles remotos, com apoio para celular." },

  // Gadgets / Tecnologia
  { id: 10, nome: "Suporte para Celular/Tablet Ajustável", categoria: "gadgets", preco: 59.9, material: "PETG", tempo: 4, altura: 140, icone: "celular", imagens: [],
    descricao: "Ângulo ajustável em três posições, compatível com celulares e tablets de até 11 polegadas." },
  { id: 11, nome: "Suporte para Fones Orbit", categoria: "gadgets", preco: 49.9, material: "PLA", tempo: 3, altura: 200, icone: "fone", imagens: [],
    descricao: "Suporte de mesa com base circular estável para headsets e fones over-ear." },
  { id: 12, nome: "Suporte para Notebook Elevado", categoria: "gadgets", preco: 89.9, material: "PETG", tempo: 6, altura: 130, icone: "notebook", imagens: [],
    descricao: "Eleva o notebook para melhorar a ventilação e a ergonomia de uso, com vãos de ventilação." },

  // Presentes / Personalizados
  { id: 13, nome: "Chaveiro Personalizado com Nome", categoria: "personalizados", preco: 19.9, material: "PLA", tempo: 1, altura: 60, icone: "chaveiro", imagens: [],
    descricao: "Chaveiro impresso com o nome ou palavra de sua escolha. Informe o texto no carrinho." },
  { id: 14, nome: "Placa com Nome/Frase Sob Medida", categoria: "personalizados", preco: 34.9, material: "PLA", tempo: 2, altura: 100, icone: "placa", imagens: [],
    descricao: "Placa de mesa ou porta com texto personalizado, várias fontes disponíveis." },
  { id: 15, nome: "Chaveiro Corporativo (sua logo)", categoria: "personalizados", preco: 24.9, material: "PLA", tempo: 1, altura: 60, icone: "chaveiro", imagens: [],
    descricao: "Chaveiro com a logo da sua empresa em relevo, ótimo para brindes." },

  // Colecionáveis / Geek
  { id: 16, nome: "Miniatura Guerreiro Fantasia", categoria: "geek", preco: 44.9, material: "Resina", tempo: 5, altura: 90, icone: "miniatura", imagens: [],
    descricao: "Miniatura autoral de guerreiro fantasia, escala 1:24, pronta para pintar." },
  { id: 17, nome: "Cenário Modular de Exibição", categoria: "geek", preco: 74.9, material: "PLA", tempo: 7, altura: 120, icone: "cenario", imagens: [],
    descricao: "Base modular com ruínas e terreno para exibir miniaturas ou dioramas." },

  // Infantil / Educativo
  { id: 18, nome: "Blocos de Encaixe Criativos", categoria: "infantil", preco: 39.9, material: "PLA", tempo: 4, altura: 40, icone: "blocos", imagens: [],
    descricao: "Kit de blocos coloridos e seguros para encaixar, estimula coordenação motora." },
  { id: 19, nome: "Quebra-Cabeça 3D Geométrico", categoria: "infantil", preco: 34.9, material: "PLA", tempo: 3, altura: 50, icone: "quebracabeca", imagens: [],
    descricao: "Peças geométricas que se encaixam formando um cubo, treina raciocínio espacial." },
  { id: 20, nome: "Kit Formas Geométricas Educativas", categoria: "infantil", preco: 29.9, material: "PLA", tempo: 3, altura: 50, icone: "formas", imagens: [],
    descricao: "Conjunto de sólidos geométricos (cubo, esfera, pirâmide, cone) para uso escolar." },

  // Fidget Toys
  { id: 21, nome: "Fidget Cube Modular", categoria: "fidget", preco: 34.9, material: "PETG", tempo: 3, altura: 30, icone: "fidgetcube", imagens: [],
    descricao: "Cubo com botão, engrenagem, roda e switch em cada face, para mexer sem parar." },
  { id: 22, nome: "Infinity Cube Articulado", categoria: "fidget", preco: 29.9, material: "PLA", tempo: 3, altura: 40, icone: "infinitycube", imagens: [],
    descricao: "Cubo articulado que se dobra infinitamente sobre si mesmo, ótimo pra ansiedade e foco." },
  { id: 23, nome: "Spinner Geométrico", categoria: "fidget", preco: 24.9, material: "PETG", tempo: 2, altura: 80, icone: "spinner", imagens: [],
    descricao: "Spinner com rolamento embutido e design facetado, gira por vários minutos." },
  { id: 24, nome: "Corrente Fidget Articulada", categoria: "fidget", preco: 19.9, material: "PLA", tempo: 2, altura: 200, icone: "correntefidget", imagens: [],
    descricao: "Corrente de elos impressos já conectados, sem precisar de montagem, pra mexer com as mãos." },
  { id: 25, nome: "Pop-it 3D Reutilizável", categoria: "fidget", preco: 22.9, material: "TPU (flexível)", tempo: 4, altura: 15, icone: "popit", imagens: [],
    descricao: "Versão impressa e flexível do clássico pop-it, com bolhas que voltam ao lugar." },

  // Extras / mais vendidos
  { id: 26, nome: "Placa Decorativa Ore e Confie", categoria: "decoracao", preco: 44.9, material: "PLA", tempo: 3, altura: 150, icone: "placa", imagens: [],
    descricao: "Placa decorativa com a frase \"Ore e Confie\", ótima para parede, estante ou de presente." },
  { id: 27, nome: "Suporte para Latinha de Cerveja", categoria: "casa", preco: 24.9, material: "PETG", tempo: 2, altura: 90, icone: "controle", imagens: [],
    descricao: "Suporte avulso para latinha de cerveja, mantém a bebida estável e ajuda a isolar o calor da mão." },
  { id: 28, nome: "Suporte para Latinha Monster Energético", categoria: "casa", preco: 24.9, material: "PETG", tempo: 2, altura: 100, icone: "controle", imagens: [],
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
