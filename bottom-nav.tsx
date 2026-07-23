"use client"

import { Home, List, BarChart3, Target } from "lucide-react"
import { MeloAvatar } from "./melo-avatar"
import { cn } from "@/lib/utils"

export type Aba = "inicio" | "extrato" | "graficos" | "metas" | "melo"

const ITENS: { id: Aba; rotulo: string }[] = [
  { id: "inicio", rotulo: "Início" },
  { id: "extrato", rotulo: "Extrato" },
  { id: "graficos", rotulo: "Gráficos" },
  { id: "metas", rotulo: "Metas" },
  { id: "melo", rotulo: "Melo" },
]

function Icone({ id, ativo }: { id: Aba; ativo: boolean }) {
  const props = { className: "h-6 w-6", strokeWidth: ativo ? 2.6 : 2 }
  switch (id) {
    case "inicio":
      return <Home {...props} />
    case "extrato":
      return <List {...props} />
    case "graficos":
      return <BarChart3 {...props} />
    case "metas":
      return <Target {...props} />
    case "melo":
      return <MeloAvatar className="h-6 w-6" rounded="rounded-md" />
  }
}

export function BottomNav({ ativa, onNavegar }: { ativa: Aba; onNavegar: (a: Aba) => void }) {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-card px-2 pb-2 pt-2">
      <ul className="flex items-center justify-between">
        {ITENS.map((item) => {
          const ativo = ativa === item.id
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => onNavegar(item.id)}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-xl py-1 text-xs font-bold transition-colors",
                  ativo ? "text-brown" : "text-primary/70 hover:text-brown",
                )}
              >
                <Icone id={item.id} ativo={ativo} />
                {item.rotulo}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
