"use client"

import { useState } from "react"
import { MonthSelector } from "@/components/month-selector"
import { TransactionRow } from "@/components/transaction-row"
import { EmptyState } from "@/components/empty-state"
import { useStore, filtrarPorMes } from "@/lib/store"
import { cn } from "@/lib/utils"

type Filtro = "todos" | "receita" | "despesa"

const CHIPS: { id: Filtro; rotulo: string }[] = [
  { id: "todos", rotulo: "Todos" },
  { id: "receita", rotulo: "Receitas" },
  { id: "despesa", rotulo: "Despesas" },
]

export function ExtratoScreen({
  ano,
  mes,
  onMudarMes,
}: {
  ano: number
  mes: number
  onMudarMes: (ano: number, mes: number) => void
}) {
  const { transacoes, config, removerTransacao } = useStore()
  const [filtro, setFiltro] = useState<Filtro>("todos")

  const doMes = filtrarPorMes(transacoes, ano, mes)
  const lista = doMes.filter((t) => (filtro === "todos" ? true : t.tipo === filtro))

  return (
    <div className="space-y-4 p-4">
      <MonthSelector ano={ano} mes={mes} onMudar={onMudarMes} />

      {/* Chips de filtro */}
      <div className="grid grid-cols-3 gap-2">
        {CHIPS.map((chip) => {
          const ativo = filtro === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFiltro(chip.id)}
              className={cn(
                "rounded-3xl py-3 text-base font-extrabold ring-2 transition-colors",
                ativo
                  ? "bg-primary text-brown ring-primary"
                  : "bg-card text-brown ring-border hover:ring-primary/50",
              )}
            >
              {chip.rotulo}
            </button>
          )
        })}
      </div>

      {/* Lista */}
      {lista.length === 0 ? (
        <div className="pt-10">
          <EmptyState titulo="Nada por aqui!" descricao="Sem registros neste período." />
        </div>
      ) : (
        <ul className="space-y-2.5">
          {lista.map((t) => (
            <TransactionRow key={t.id} transacao={t} ocultar={config.esconderSaldos} onRemover={removerTransacao} />
          ))}
        </ul>
      )}
    </div>
  )
}
