"use client"

import { Settings, Plus } from "lucide-react"
import { MeloAvatar } from "./melo-avatar"

export function AppHeader({
  onSettings,
  onReceita,
  onDespesa,
}: {
  onSettings: () => void
  onReceita: () => void
  onDespesa: () => void
}) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-b from-[#f7b733] to-[#f5a623] px-4 pb-4 pt-5 shadow-[0_4px_14px_-6px_rgba(139,69,19,0.5)]">
      <div className="flex items-center gap-3">
        {/* Logo + nome */}
        <MeloAvatar className="h-11 w-11" rounded="rounded-xl" showDot />
        <h1 className="mr-auto text-2xl font-extrabold leading-[0.95] text-[#5a3210]">
          Money
          <br />
          Bee
        </h1>

        {/* Engrenagem */}
        <button
          type="button"
          onClick={onSettings}
          aria-label="Configurações"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5a3210]/10 text-[#5a3210] transition-colors hover:bg-[#5a3210]/20"
        >
          <Settings className="h-5 w-5" />
        </button>

        {/* Receita */}
        <button
          type="button"
          onClick={onReceita}
          className="flex flex-col items-center rounded-3xl bg-accent px-4 py-1.5 font-bold text-accent-foreground shadow-md transition-transform active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={3} />
          <span className="text-sm leading-tight">Receita</span>
        </button>

        {/* Despesa */}
        <button
          type="button"
          onClick={onDespesa}
          className="flex flex-col items-center rounded-3xl bg-destructive px-4 py-1.5 font-bold text-white shadow-md transition-transform active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={3} />
          <span className="text-sm leading-tight">Despesa</span>
        </button>
      </div>
    </header>
  )
}
