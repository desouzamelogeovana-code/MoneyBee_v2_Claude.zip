// Formata número como moeda brasileira
export function brl(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]

// "Julho 2026"
export function nomeMesAno(ano: number, mes: number): string {
  return `${MESES[mes]} ${ano}`
}

export function mesCurto(mes: number): string {
  return MESES_CURTOS[mes]
}

// Recebe "2026-07-22" e devolve "22/07/2026"
export function formatarDataBR(iso: string): string {
  const [ano, mes, dia] = iso.split("-")
  return `${dia}/${mes}/${ano}`
}

// Data de hoje em ISO curto (yyyy-mm-dd) no fuso local
export function hojeISO(): string {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

// Rótulo relativo amigável para uma data ISO
export function rotuloData(iso: string): string {
  const hoje = hojeISO()
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const ontem = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  if (iso === hoje) return "Hoje"
  if (iso === ontem) return "Ontem"
  const [ano, mes, dia] = iso.split("-")
  return `${dia}/${mes}/${ano.slice(2)}`
}
