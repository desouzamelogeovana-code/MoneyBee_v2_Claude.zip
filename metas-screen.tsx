"use client"

import { useState } from "react"
import { Plus, Trash2, Target, PiggyBank, X, Check } from "lucide-react"
import { CurrencyInput } from "@/components/currency-input"
import { useStore, type Meta } from "@/lib/store"
import { brl, formatarDataBR, hojeISO } from "@/lib/format"

export function MetasScreen() {
  const { metas, addMeta, removerMeta, guardarNaMeta } = useStore()
  const [novaAberta, setNovaAberta] = useState(false)
  const [guardarId, setGuardarId] = useState<string | null>(null)

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-extrabold text-brown">Minhas Metas</h2>
        <Target className="h-7 w-7 text-destructive" strokeWidth={2.5} />
        <button
          type="button"
          onClick={() => setNovaAberta(true)}
          className="ml-auto flex items-center gap-1 rounded-3xl bg-primary px-4 py-2.5 font-extrabold text-brown shadow-md transition-transform active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={3} />
          Nova Meta
        </button>
      </div>

      {metas.length === 0 ? (
        <div className="card-mb bg-card p-8 text-center ring-1 ring-border">
          <p className="font-extrabold text-brown">Nenhuma meta ainda</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Crie uma meta e comece a guardar mel!
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {metas.map((meta) => (
            <CardMeta
              key={meta.id}
              meta={meta}
              onRemover={() => removerMeta(meta.id)}
              onGuardar={() => setGuardarId(meta.id)}
            />
          ))}
        </ul>
      )}

      {novaAberta && (
        <NovaMetaModal
          onFechar={() => setNovaAberta(false)}
          onSalvar={(m) => {
            addMeta(m)
            setNovaAberta(false)
          }}
        />
      )}

      {guardarId && (
        <GuardarModal
          onFechar={() => setGuardarId(null)}
          onGuardar={(valor) => {
            guardarNaMeta(guardarId, valor)
            setGuardarId(null)
          }}
        />
      )}
    </div>
  )
}

function CardMeta({ meta, onRemover, onGuardar }: { meta: Meta; onRemover: () => void; onGuardar: () => void }) {
  const pct = Math.min(100, Math.round((meta.guardado / meta.alvo) * 100))
  return (
    <li className="card-mb bg-card p-5 ring-1 ring-border">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/25 text-brown">
          <PiggyBank className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-extrabold text-brown">{meta.nome}</h3>
          <p className="text-sm font-semibold text-muted-foreground">Prazo: {formatarDataBR(meta.prazo)}</p>
        </div>
        <button
          type="button"
          onClick={onRemover}
          aria-label="Remover meta"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between font-extrabold">
        <span className="text-brown">{brl(meta.guardado)}</span>
        <span className="text-muted-foreground">Meta: {brl(meta.alvo)}</span>
      </div>

      <div className="mt-2 h-3.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="font-extrabold text-brown">{pct}% concluído</span>
        <button
          type="button"
          onClick={onGuardar}
          className="flex items-center gap-1 rounded-3xl bg-secondary px-4 py-2 font-extrabold text-brown transition-colors hover:bg-primary/30"
        >
          <Plus className="h-4 w-4" strokeWidth={3} />
          Guardar
        </button>
      </div>
    </li>
  )
}

function NovaMetaModal({
  onFechar,
  onSalvar,
}: {
  onFechar: () => void
  onSalvar: (m: { nome: string; alvo: number; prazo: string }) => void
}) {
  const [nome, setNome] = useState("")
  const [centavos, setCentavos] = useState(0)
  const [prazo, setPrazo] = useState(hojeISO())

  const salvar = () => {
    if (!nome.trim() || centavos <= 0) return
    onSalvar({ nome: nome.trim(), alvo: centavos / 100, prazo })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button type="button" aria-label="Fechar" onClick={onFechar} className="absolute inset-0 bg-brown/40 backdrop-blur-[2px]" />
      <div className="animate-sheet-up relative w-full max-w-md rounded-t-3xl bg-cream p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-2xl font-extrabold text-brown">Nova Meta</h2>
          <button type="button" onClick={onFechar} aria-label="Fechar" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 text-brown">
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Casamento, viagem..."
              className="w-full rounded-2xl border-2 border-primary/60 bg-white px-4 py-3.5 font-semibold text-brown outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">Valor da meta (R$)</label>
            <CurrencyInput centavos={centavos} onChange={setCentavos} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">Prazo</label>
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
              className="w-full rounded-2xl border-2 border-primary/60 bg-white px-4 py-3.5 text-lg font-bold text-brown outline-none"
            />
          </div>
          <button
            type="button"
            onClick={salvar}
            disabled={!nome.trim() || centavos <= 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-xl font-extrabold text-brown shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <Check className="h-6 w-6" strokeWidth={3} />
            Criar Meta
          </button>
        </div>
      </div>
    </div>
  )
}

function GuardarModal({ onFechar, onGuardar }: { onFechar: () => void; onGuardar: (valor: number) => void }) {
  const [centavos, setCentavos] = useState(0)
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button type="button" aria-label="Fechar" onClick={onFechar} className="absolute inset-0 bg-brown/40 backdrop-blur-[2px]" />
      <div className="animate-sheet-up relative w-full max-w-md rounded-t-3xl bg-cream p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-2xl font-extrabold text-brown">Guardar na meta</h2>
          <button type="button" onClick={onFechar} aria-label="Fechar" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 text-brown">
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
        <div className="space-y-4">
          <CurrencyInput centavos={centavos} onChange={setCentavos} />
          <button
            type="button"
            onClick={() => centavos > 0 && onGuardar(centavos / 100)}
            disabled={centavos <= 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-xl font-extrabold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <Check className="h-6 w-6" strokeWidth={3} />
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
