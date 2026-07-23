"use client"

import { useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"
import { MeloAvatar } from "@/components/melo-avatar"
import { useStore, filtrarPorMes, totais } from "@/lib/store"
import { brl } from "@/lib/format"

type Msg = { role: "user" | "assistant"; content: string }

const SAUDACAO: Msg = {
  role: "assistant",
  content:
    "Oi, abelhinha! Eu sou a Melo, sua assistente aqui do Money Bee. Posso te ajudar a gerenciar suas economias, gastos e investimentos de forma simples e divertida. 🐝",
}

export function MeloScreen() {
  const { transacoes } = useStore()
  const [mensagens, setMensagens] = useState<Msg[]>([SAUDACAO])
  const [texto, setTexto] = useState("")
  const [carregando, setCarregando] = useState(false)
  const fimRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [mensagens, carregando])

  const enviar = async () => {
    const conteudo = texto.trim()
    if (!conteudo || carregando) return
    const novas = [...mensagens, { role: "user" as const, content: conteudo }]
    setMensagens(novas)
    setTexto("")
    setCarregando(true)

    // Monta um resumo do mês atual para dar contexto à Melo
    const hoje = new Date()
    const doMes = filtrarPorMes(transacoes, hoje.getFullYear(), hoje.getMonth())
    const { receitas, despesas, saldo } = totais(doMes)
    const resumo = `Receitas do mês: ${brl(receitas)}. Despesas do mês: ${brl(despesas)}. Saldo: ${brl(saldo)}. Total de transações registradas: ${transacoes.length}.`

    try {
      const res = await fetch("/api/melo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: novas.slice(1), resumo }),
      })
      const data = await res.json()
      setMensagens((prev) => [...prev, { role: "assistant", content: data.text }])
    } catch {
      setMensagens((prev) => [
        ...prev,
        { role: "assistant", content: "Ops, não consegui responder agora. Tenta de novo! 🐝" },
      ])
    } finally {
      setCarregando(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      enviar()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Mensagens */}
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        {mensagens.map((m, i) =>
          m.role === "assistant" ? (
            <div key={i} className="flex items-end gap-2">
              <MeloAvatar className="h-9 w-9" rounded="rounded-full" />
              <div className="max-w-[80%] rounded-3xl rounded-bl-lg bg-card p-3.5 font-semibold leading-relaxed text-brown shadow-[0_4px_14px_-8px_rgba(139,69,19,0.4)] ring-1 ring-border">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[80%] rounded-3xl rounded-br-lg bg-primary p-3.5 font-bold leading-relaxed text-brown shadow-md">
                {m.content}
              </div>
            </div>
          ),
        )}

        {carregando && (
          <div className="flex items-end gap-2">
            <MeloAvatar className="h-9 w-9" rounded="rounded-full" />
            <div className="flex gap-1 rounded-3xl rounded-bl-lg bg-card px-4 py-4 ring-1 ring-border">
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
            </div>
          </div>
        )}
        <div ref={fimRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-border bg-cream p-3">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Pergunte algo para a Melo..."
          className="flex-1 rounded-3xl border-2 border-primary/50 bg-white px-4 py-3 font-semibold text-brown outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={enviar}
          disabled={!texto.trim() || carregando}
          aria-label="Enviar mensagem"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/80 text-brown shadow-md transition-transform active:scale-95 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
