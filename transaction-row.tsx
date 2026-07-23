"use client"

import { Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { Transacao } from "@/lib/store"
import { acharCategoria } from "@/lib/categories"
import { brl, rotuloData } from "@/lib/format"

export function TransactionRow({
  transacao,
  ocultar,
  onRemover,
}: {
  transacao: Transacao
  ocultar: boolean
  onRemover: (id: string) => void
}) {
  const receita = transacao.tipo === "receita"
  const cat = acharCategoria(transacao.categoria)
  const Icone = cat?.icone ?? (receita ? ArrowUpRight : ArrowDownRight)
  const titulo = transacao.descricao || cat?.nome || (receita ? "Receita" : "Despesa")

  return (
    <li className="card-mb flex items-center gap-3 bg-card p-3 ring-1 ring-border">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
          receita ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        }`}
      >
        <Icone className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-brown">{titulo}</p>
        <p className="truncate text-xs font-semibold text-muted-foreground">
          {cat?.nome ?? (receita ? "Receita" : "Despesa")} · {rotuloData(transacao.data)}
        </p>
      </div>
      <p className={`shrink-0 font-extrabold ${receita ? "text-accent" : "text-destructive"}`}>
        {receita ? "+" : "-"} {ocultar ? "••••" : brl(transacao.valor)}
      </p>
      <button
        type="button"
        onClick={() => onRemover(transacao.id)}
        aria-label="Remover transação"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  )
}
