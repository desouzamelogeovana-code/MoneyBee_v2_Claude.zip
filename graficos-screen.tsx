"use client"

import { useMemo } from "react"
import { FileText, BarChart3 } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { MonthSelector } from "@/components/month-selector"
import { useStore, filtrarPorMes } from "@/lib/store"
import { acharCategoria } from "@/lib/categories"
import { brl, mesCurto } from "@/lib/format"

const CORES = ["#f5a623", "#228b22", "#8b4513", "#d9534f", "#f0c419", "#a97c50", "#c0563e", "#6bbf59"]

export function GraficosScreen({
  ano,
  mes,
  onMudarMes,
}: {
  ano: number
  mes: number
  onMudarMes: (ano: number, mes: number) => void
}) {
  const { transacoes } = useStore()

  // Gastos por categoria no mês selecionado
  const porCategoria = useMemo(() => {
    const doMes = filtrarPorMes(transacoes, ano, mes).filter((t) => t.tipo === "despesa")
    const mapa = new Map<string, number>()
    for (const t of doMes) {
      const chave = t.categoria ?? "outros"
      mapa.set(chave, (mapa.get(chave) ?? 0) + t.valor)
    }
    return Array.from(mapa.entries())
      .map(([id, valor]) => ({ nome: acharCategoria(id)?.nome ?? "Outros", valor }))
      .sort((a, b) => b.valor - a.valor)
  }, [transacoes, ano, mes])

  // Comparativo dos últimos 6 meses
  const comparativo = useMemo(() => {
    const linhas: { mes: string; Receitas: number; Despesas: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(ano, mes - i, 1)
      const doMes = filtrarPorMes(transacoes, d.getFullYear(), d.getMonth())
      linhas.push({
        mes: mesCurto(d.getMonth()),
        Receitas: doMes.filter((t) => t.tipo === "receita").reduce((s, t) => s + t.valor, 0),
        Despesas: doMes.filter((t) => t.tipo === "despesa").reduce((s, t) => s + t.valor, 0),
      })
    }
    return linhas
  }, [transacoes, ano, mes])

  const temComparativo = comparativo.some((l) => l.Receitas > 0 || l.Despesas > 0)

  const gerarPDF = () => window.print()

  return (
    <div className="space-y-4 p-4">
      {/* Botão gerar PDF */}
      <button
        type="button"
        onClick={gerarPDF}
        className="flex w-full items-center justify-center gap-2 rounded-3xl bg-primary py-4 text-lg font-extrabold text-brown shadow-md transition-transform active:scale-[0.98]"
      >
        <FileText className="h-5 w-5" strokeWidth={2.5} />
        Gerar Relatório em PDF
      </button>

      <MonthSelector ano={ano} mes={mes} onMudar={onMudarMes} />

      {/* Gastos por Categoria */}
      <section className="card-mb bg-card p-5 ring-1 ring-border">
        <h2 className="text-xl font-extrabold text-brown">Gastos por Categoria</h2>
        {porCategoria.length === 0 ? (
          <div className="flex flex-col items-center py-8">
            <BarChart3 className="h-14 w-14 text-primary/60" strokeWidth={1.5} />
            <p className="mt-3 font-extrabold text-primary">Sem dados este mês</p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={porCategoria}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {porCategoria.map((_, i) => (
                      <Cell key={i} fill={CORES[i % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => brl(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5">
              {porCategoria.slice(0, 6).map((c, i) => (
                <li key={c.nome} className="flex items-center gap-2 text-sm">
                  <span className="h-3 w-3 rounded-full" style={{ background: CORES[i % CORES.length] }} />
                  <span className="flex-1 font-bold text-brown">{c.nome}</span>
                  <span className="font-extrabold text-destructive">{brl(c.valor)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Comparativo Mensal */}
      <section className="card-mb bg-card p-5 ring-1 ring-border">
        <h2 className="text-xl font-extrabold text-brown">Comparativo Mensal</h2>
        {!temComparativo ? (
          <div className="flex flex-col items-center py-8">
            <BarChart3 className="h-14 w-14 text-primary/60" strokeWidth={1.5} />
            <p className="mt-3 font-extrabold text-primary">Sem dados ainda</p>
          </div>
        ) : (
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparativo} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#f0e2b6" vertical={false} />
                <XAxis dataKey="mes" tick={{ fill: "#8b4513", fontWeight: 700, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#a97c50", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => brl(Number(v))} cursor={{ fill: "#fff3c4" }} />
                <Legend wrapperStyle={{ fontWeight: 700, color: "#8b4513" }} />
                <Bar dataKey="Receitas" fill="#228b22" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Despesas" fill="#d9534f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  )
}
