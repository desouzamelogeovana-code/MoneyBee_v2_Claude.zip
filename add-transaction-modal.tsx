"use client"

import { useEffect, useState } from "react"
import { X, Check } from "lucide-react"
import { CurrencyInput } from "./currency-input"
import { useStore } from "@/lib/store"
import { CATEGORIAS_DESPESA, CATEGORIAS_RECEITA, METODOS_PAGAMENTO } from "@/lib/categories"
import { hojeISO } from "@/lib/format"
import { cn } from "@/lib/utils"

type Tipo = "receita" | "despesa"

export function AddTransactionModal({
  tipo,
  onFechar,
}: {
  tipo: Tipo | null
  onFechar: () => void
}) {
  const { addTransacao, config } = useStore()
  const [centavos, setCentavos] = useState(0)
  const [data, setData] = useState(hojeISO())
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState<string>("")
  const [metodo, setMetodo] = useState<string>("dinheiro")

  const aberto = tipo !== null
  const receita = tipo === "receita"

  // Reseta os campos ao abrir
  useEffect(() => {
    if (aberto) {
      setCentavos(0)
      setData(hojeISO())
      setDescricao("")
      setCategoria(receita ? "" : "compras")
      setMetodo("dinheiro")
    }
  }, [aberto, receita])

  if (!aberto) return null

  const categorias = receita ? CATEGORIAS_RECEITA : CATEGORIAS_DESPESA

  const salvar = () => {
    if (centavos <= 0) return
    if (config.vibracao && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30)
    }
    addTransacao({
      tipo: tipo as Tipo,
      valor: centavos / 100,
      data,
      descricao: descricao.trim(),
      categoria: categoria || undefined,
      metodo: receita ? undefined : metodo,
    })
    onFechar()
  }

  const corTitulo = receita ? "text-accent" : "text-destructive"
  const corBotao = receita ? "bg-accent" : "bg-destructive"
  const corValor = receita ? "text-accent" : "text-primary"

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* fundo escurecido */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onFechar}
        className="absolute inset-0 bg-brown/40 backdrop-blur-[2px]"
      />

      {/* folha inferior */}
      <div className="animate-sheet-up relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl">
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <h2 className={cn("text-2xl font-extrabold", corTitulo)}>
            {receita ? "Adicionar Receita" : "Adicionar Despesa"}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/30 text-brown transition-colors hover:bg-primary/50"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 pb-4">
          {/* Valor */}
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">
              Valor (R$)
            </label>
            <CurrencyInput centavos={centavos} onChange={setCentavos} cor={corValor} />
          </div>

          {/* Data */}
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">
              Data
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-2xl border-2 border-primary/60 bg-white px-4 py-3.5 text-lg font-bold text-brown outline-none"
            />
          </div>

          {/* Categoria (grade) */}
          <div>
            <label className="mb-2 block text-sm font-extrabold uppercase tracking-wide text-brown">
              Categoria
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categorias.map((cat) => {
                const Icone = cat.icone
                const sel = categoria === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoria(cat.id)}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full ring-2 transition-all",
                        sel
                          ? "bg-primary text-brown ring-primary"
                          : "bg-white text-brown/70 ring-border hover:ring-primary/50",
                      )}
                    >
                      <Icone className="h-6 w-6" />
                    </span>
                    <span className="text-[10px] font-bold leading-tight text-brown">{cat.nome}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Método de pagamento (só despesa) */}
          {!receita && (
            <div>
              <label className="mb-2 block text-sm font-extrabold uppercase tracking-wide text-brown">
                Método de pagamento
              </label>
              <div className="grid grid-cols-4 gap-2">
                {METODOS_PAGAMENTO.map((m) => {
                  const Icone = m.icone
                  const sel = metodo === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMetodo(m.id)}
                      className="flex flex-col items-center gap-1 text-center"
                    >
                      <span
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-full ring-2 transition-all",
                          sel
                            ? "bg-primary text-brown ring-primary"
                            : "bg-white text-brown/70 ring-border hover:ring-primary/50",
                        )}
                      >
                        <Icone className="h-6 w-6" />
                      </span>
                      <span className="text-[10px] font-bold leading-tight text-brown">{m.nome}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Descrição */}
          <div>
            <label className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-brown">
              Descrição (opcional)
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Salário, mercado..."
              className="w-full rounded-2xl border-2 border-primary/60 bg-white px-4 py-3.5 font-semibold text-brown outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Botão salvar fixo */}
        <div className="border-t border-border bg-cream px-5 pb-6 pt-3">
          <button
            type="button"
            onClick={salvar}
            disabled={centavos <= 0}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xl font-extrabold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-50",
              corBotao,
            )}
          >
            <Check className="h-6 w-6" strokeWidth={3} />
            {receita ? "Salvar Receita" : "Salvar Despesa"}
          </button>
        </div>
      </div>
    </div>
  )
}
