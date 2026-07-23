"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { nomeMesAno } from "@/lib/format"

export function MonthSelector({
  ano,
  mes,
  onMudar,
}: {
  ano: number
  mes: number
  onMudar: (ano: number, mes: number) => void
}) {
  const anterior = () => {
    if (mes === 0) onMudar(ano - 1, 11)
    else onMudar(ano, mes - 1)
  }
  const proximo = () => {
    if (mes === 11) onMudar(ano + 1, 0)
    else onMudar(ano, mes + 1)
  }

  return (
    <div className="flex items-center justify-between rounded-3xl bg-secondary px-4 py-3 ring-1 ring-border">
      <button
        type="button"
        onClick={anterior}
        aria-label="Mês anterior"
        className="flex h-8 w-8 items-center justify-center rounded-full text-brown transition-colors hover:bg-primary/20"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
      </button>
      <span className="text-lg font-extrabold text-brown">{nomeMesAno(ano, mes)}</span>
      <button
        type="button"
        onClick={proximo}
        aria-label="Próximo mês"
        className="flex h-8 w-8 items-center justify-center rounded-full text-brown transition-colors hover:bg-primary/20"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
      </button>
    </div>
  )
}
