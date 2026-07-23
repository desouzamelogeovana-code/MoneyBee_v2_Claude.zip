"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Transacao = {
  id: string
  tipo: "receita" | "despesa"
  valor: number
  data: string // yyyy-mm-dd
  descricao: string
  categoria?: string
  metodo?: string
}

export type Meta = {
  id: string
  nome: string
  alvo: number
  guardado: number
  prazo: string // yyyy-mm-dd
}

export type Config = {
  esconderSaldos: boolean
  confete: boolean
  sons: boolean
  vibracao: boolean
}

const CONFIG_PADRAO: Config = {
  esconderSaldos: false,
  confete: true,
  sons: true,
  vibracao: true,
}

const METAS_PADRAO: Meta[] = [
  { id: "m1", nome: "Casamento", alvo: 7000, guardado: 2424.44, prazo: "2026-10-01" },
]

type StoreCtx = {
  transacoes: Transacao[]
  metas: Meta[]
  config: Config
  addTransacao: (t: Omit<Transacao, "id">) => void
  removerTransacao: (id: string) => void
  addMeta: (m: Omit<Meta, "id" | "guardado">) => void
  removerMeta: (id: string) => void
  guardarNaMeta: (id: string, valor: number) => void
  setConfig: (c: Partial<Config>) => void
  restaurarPadroes: () => void
}

const Ctx = createContext<StoreCtx | null>(null)

const CHAVE = "money-bee-dados-v1"

function carregar<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao
  try {
    const raw = localStorage.getItem(chave)
    return raw ? (JSON.parse(raw) as T) : padrao
  } catch {
    return padrao
  }
}

function gerarId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [metas, setMetas] = useState<Meta[]>(METAS_PADRAO)
  const [config, setConfigState] = useState<Config>(CONFIG_PADRAO)
  const [pronto, setPronto] = useState(false)

  // Carrega do localStorage na montagem
  useEffect(() => {
    const dados = carregar(CHAVE, {
      transacoes: [] as Transacao[],
      metas: METAS_PADRAO,
      config: CONFIG_PADRAO,
    })
    setTransacoes(dados.transacoes ?? [])
    setMetas(dados.metas ?? METAS_PADRAO)
    setConfigState({ ...CONFIG_PADRAO, ...(dados.config ?? {}) })
    setPronto(true)
  }, [])

  // Persiste sempre que algo mudar
  useEffect(() => {
    if (!pronto) return
    localStorage.setItem(CHAVE, JSON.stringify({ transacoes, metas, config }))
  }, [transacoes, metas, config, pronto])

  const value = useMemo<StoreCtx>(
    () => ({
      transacoes,
      metas,
      config,
      addTransacao: (t) => setTransacoes((prev) => [{ ...t, id: gerarId() }, ...prev]),
      removerTransacao: (id) => setTransacoes((prev) => prev.filter((t) => t.id !== id)),
      addMeta: (m) => setMetas((prev) => [...prev, { ...m, id: gerarId(), guardado: 0 }]),
      removerMeta: (id) => setMetas((prev) => prev.filter((m) => m.id !== id)),
      guardarNaMeta: (id, valor) =>
        setMetas((prev) => prev.map((m) => (m.id === id ? { ...m, guardado: m.guardado + valor } : m))),
      setConfig: (c) => setConfigState((prev) => ({ ...prev, ...c })),
      restaurarPadroes: () => setConfigState(CONFIG_PADRAO),
    }),
    [transacoes, metas, config],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider")
  return ctx
}

// Helpers de cálculo por mês
export function filtrarPorMes(transacoes: Transacao[], ano: number, mes: number) {
  return transacoes.filter((t) => {
    const [a, m] = t.data.split("-").map(Number)
    return a === ano && m - 1 === mes
  })
}

export function totais(transacoes: Transacao[]) {
  const receitas = transacoes.filter((t) => t.tipo === "receita").reduce((s, t) => s + t.valor, 0)
  const despesas = transacoes.filter((t) => t.tipo === "despesa").reduce((s, t) => s + t.valor, 0)
  return { receitas, despesas, saldo: receitas - despesas }
}
