/* Ícones em estilo "desenho técnico" (stroke, sem preenchimento) para cada produto.
   Usam currentColor, então herdam a cor definida no elemento pai. */

const ICONS = {
  vaso: `<path d="M24 8h16l-3 14c5 4 7 10 7 16 0 10-8 18-12 18s-12-8-12-18c0-6 2-12 7-16L24 8Z"/><path d="M22 8h20"/>`,
  luminaria: `<path d="M32 6v8"/><path d="M16 22 32 14l16 8-6 20H22L16 22Z"/><path d="M26 42v6h12v-6"/><path d="M22 56h20"/>`,
  retrato: `<rect x="8" y="14" width="20" height="26" rx="1"/><rect x="34" y="10" width="22" height="30" rx="1"/><path d="M40 40v10M46 50h-12"/><circle cx="16" cy="22" r="2.5"/>`,
  escultura: `<path d="M20 56c-4-10 2-16 2-24 0-10-8-12-6-20 2-6 10-6 12 0 3 8-4 12-2 20 2 8 8 12 4 24"/>`,
  vela: `<path d="M16 56V34l6-10 6 10v22"/><path d="M34 56V40l6-8 6 8v16"/><path d="M12 56h44"/>`,
  organizador: `<rect x="8" y="20" width="48" height="30" rx="1"/><path d="M22 20v30M36 20v30M8 34h14M36 34h20"/>`,
  planta: `<path d="M14 56 20 34h24l6 22Z"/><path d="M32 34v-8"/><path d="M32 26c-6 0-9-5-9-11 6 0 11 3 11 9M32 26c6 0 9-5 9-11-6 0-11 3-11 9"/>`,
  gancho: `<rect x="10" y="10" width="44" height="10" rx="1"/><path d="M20 20v10a6 6 0 0 0 12 0M44 20v10a6 6 0 0 1-12 0"/>`,
  controle: `<rect x="8" y="24" width="48" height="14" rx="4"/><rect x="8" y="42" width="48" height="14" rx="4"/><circle cx="50" cy="31" r="2"/><circle cx="50" cy="49" r="2"/>`,
  celular: `<path d="M14 54V22c0-4 14-8 18-8s18 4 18 8v6"/><rect x="24" y="34" width="16" height="24" rx="2"/><path d="M20 22h24"/>`,
  fone: `<path d="M12 40v-6a20 20 0 0 1 40 0v6"/><rect x="8" y="38" width="10" height="16" rx="3"/><rect x="46" y="38" width="10" height="16" rx="3"/>`,
  notebook: `<rect x="10" y="16" width="44" height="26" rx="2"/><path d="M6 48h52l-4 6H10Z"/><path d="M16 22h32"/>`,
  chaveiro: `<circle cx="20" cy="16" r="8"/><path d="M20 24v14"/><rect x="12" y="38" width="16" height="18" rx="2"/><path d="M20 44v6"/>`,
  placa: `<rect x="8" y="20" width="48" height="24" rx="2"/><path d="M16 32h32M16 26h20"/>`,
  miniatura: `<circle cx="32" cy="14" r="6"/><path d="M32 20v18M22 30l10-4 10 4M24 56l8-18 8 18M20 34l-4 12M44 34l4 12"/>`,
  cenario: `<path d="M8 50h48"/><path d="M14 50V30l8-6 8 6v20"/><path d="M36 50V36l6-4 6 4v14"/><path d="M18 24h4M40 32h4"/>`,
  blocos: `<rect x="8" y="34" width="16" height="16"/><rect x="26" y="34" width="16" height="16"/><rect x="17" y="16" width="16" height="16"/>`,
  quebracabeca: `<path d="M12 12h16v6a4 4 0 0 0 8 0v-6h16v16h-6a4 4 0 0 0 0 8h6v16H36v-6a4 4 0 0 0-8 0v6H12V36h6a4 4 0 0 0 0-8h-6Z"/>`,
  formas: `<circle cx="16" cy="16" r="8"/><rect x="34" y="8" width="16" height="16"/><path d="M8 52l10-18 10 18Z"/><path d="M38 34h16v16H38Z" transform="rotate(45 46 42)"/>`,
  fidgetcube: `<rect x="14" y="14" width="36" height="36" rx="3"/><circle cx="32" cy="32" r="6"/><path d="M14 24h10M14 40h10M40 24h10M40 40h10"/>`,
  infinitycube: `<rect x="8" y="24" width="16" height="16"/><rect x="24" y="24" width="16" height="16"/><rect x="40" y="24" width="16" height="16"/><path d="M8 24V16h16v8M40 40v8H24v-8"/>`,
  spinner: `<circle cx="32" cy="32" r="6"/><circle cx="32" cy="14" r="6"/><circle cx="16" cy="42" r="6"/><circle cx="48" cy="42" r="6"/><path d="M32 20v6M27 35l-8 4M37 35l8 4"/>`,
  correntefidget: `<rect x="6" y="26" width="16" height="12" rx="6"/><rect x="18" y="26" width="16" height="12" rx="6"/><rect x="30" y="26" width="16" height="12" rx="6"/><rect x="42" y="26" width="16" height="12" rx="6"/>`,
  popit: `<rect x="8" y="8" width="48" height="48" rx="6"/><circle cx="20" cy="20" r="4"/><circle cx="32" cy="20" r="4"/><circle cx="44" cy="20" r="4"/><circle cx="20" cy="32" r="4"/><circle cx="32" cy="32" r="4"/><circle cx="44" cy="32" r="4"/><circle cx="20" cy="44" r="4"/><circle cx="32" cy="44" r="4"/><circle cx="44" cy="44" r="4"/>`,
};

function productIconSVG(iconKey, extraClass) {
  const paths = ICONS[iconKey] || ICONS.formas;
  return `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${extraClass || ""}">${paths}</svg>`;
}
