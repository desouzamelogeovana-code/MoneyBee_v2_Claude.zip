"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { MonthSelector } from "@/components/month-selector"
import { TransactionRow } from "@/components/transaction-row"
import { EmptyState } from "@/components/empty-state"
import { useStore, filtrarPorMes, totais } from "@/lib/store"
import { brl } from "@/lib/format"

export function HomeScreen({
  ano,
  mes,
  onMudarMes,
  onReceita,
  onDespesa,
}: {
  ano: number
  mes: number
  onMudarMes: (ano: number, mes: number) => void
  onReceita: () => void
  onDespesa: () => void
}) {
  const { transacoes, config, removerTransacao } = useStore()
  const doMes = filtrarPorMes(transacoes, ano, mes)
  const { receitas, despesas, saldo } = totais(doMes)
  const ocultar = config.esconderSaldos

  const mostrar = (v: number) => (ocultar ? "R$ ••••" : brl(v))

  return (
    <div className="space-y-4 p-4">
      <MonthSelector ano={ano} mes={mes} onMudar={onMudarMes} />

      {/* Card Saldo do Mês */}
      <section className="card-mb relative overflow-hidden bg-gradient-to-br from-[#f5a623] to-[#ef971a] p-5">
        {/* Marca d'água hexagonal */}
        <svg
          className="pointer-events-none absolute -right-6 top-4 h-40 w-40 text-white/15"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon
            points="50,3 93,27 93,73 50,97 7,73 7,27"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>

        <p className="text-sm font-bold uppercase tracking-wide text-[#7a4a12]">Saldo do mês</p>
        <p className="mt-1 text-4xl font-extrabold text-[#5a3210]">{mostrar(saldo)}</p>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-xs font-bold text-[#7a4a12]">Receitas</p>
              <p className="font-extrabold text-accent">{mostrar(receitas)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-white">
              <TrendingDown className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-xs font-bold text-[#7a4a12]">Despesas</p>
              <p className="font-extrabold text-destructive">{mostrar(despesas)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Botões grandes */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReceita}
          className="flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border-2 border-accent/40 bg-accent/10 px-5 py-5 text-xl font-extrabold text-accent transition-transform active:scale-95"
        >
          <TrendingUp className="h-6 w-6" strokeWidth={2.5} />+ Receita
        </button>
        <button
          type="button"
          onClick={onDespesa}
          className="flex min-h-[64px] items-center justify-center gap-2 rounded-2xl border-2 border-destructive/40 bg-destructive/10 px-5 py-5 text-xl font-extrabold text-destructive transition-transform active:scale-95"
        >
          <TrendingDown className="h-6 w-6" strokeWidth={2.5} />+ Despesa
        </button>
      </div>

      {/* Últimas Transações */}
      <section className="card-mb bg-card p-5 ring-1 ring-border">
        <h2 className="text-xl font-extrabold text-brown">Últimas Transações</h2>
        {doMes.length === 0 ? (
          <EmptyState titulo="Nenhum registro ainda!" descricao="Comece adicionando uma receita ou despesa." />
        ) : (
          <ul className="mt-4 space-y-2.5">
            {doMes.slice(0, 8).map((t) => (
              <TransactionRow key={t.id} transacao={t} ocultar={ocultar} onRemover={removerTransacao} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
