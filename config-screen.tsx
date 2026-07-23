"use client"

import { EyeOff, Sparkles, Volume2, Vibrate, Info, RotateCcw, type LucideIcon } from "lucide-react"
import { MeloAvatar } from "@/components/melo-avatar"
import { useStore, type Config } from "@/lib/store"
import { cn } from "@/lib/utils"

function Toggle({ ligado, onToggle }: { ligado: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      onClick={onToggle}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors",
        ligado ? "bg-primary" : "bg-border",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform",
          ligado ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

function LinhaConfig({
  icone: Icone,
  titulo,
  descricao,
  ligado,
  onToggle,
}: {
  icone: LucideIcon
  titulo: string
  descricao: string
  ligado: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 card-mb bg-card p-4 ring-1 ring-border">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/25 text-brown">
        <Icone className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="font-extrabold text-brown">{titulo}</p>
        <p className="text-sm font-semibold leading-snug text-muted-foreground">{descricao}</p>
      </div>
      <Toggle ligado={ligado} onToggle={onToggle} />
    </div>
  )
}

function Secao({ titulo }: { titulo: string }) {
  return <h3 className="px-1 pt-2 text-sm font-extrabold uppercase tracking-wide text-primary">{titulo}</h3>
}

export function ConfigScreen() {
  const { config, setConfig, restaurarPadroes } = useStore()

  const alternar = (chave: keyof Config) => setConfig({ [chave]: !config[chave] })

  return (
    <div className="space-y-3 p-4 pb-8">
      <Secao titulo="Exibição" />
      <LinhaConfig
        icone={EyeOff}
        titulo="Esconder saldos"
        descricao="Oculta todos os valores de receitas e despesas no app"
        ligado={config.esconderSaldos}
        onToggle={() => alternar("esconderSaldos")}
      />
      <LinhaConfig
        icone={Sparkles}
        titulo="Confete de comemoração"
        descricao="Comemora quando você atinge uma meta"
        ligado={config.confete}
        onToggle={() => alternar("confete")}
      />

      <Secao titulo="Sons e Toques" />
      <LinhaConfig
        icone={Volume2}
        titulo="Sons"
        descricao="Efeitos sonoros ao adicionar e remover transações"
        ligado={config.sons}
        onToggle={() => alternar("sons")}
      />
      <LinhaConfig
        icone={Vibrate}
        titulo="Vibração"
        descricao="Feedback tátil nas ações do app"
        ligado={config.vibracao}
        onToggle={() => alternar("vibracao")}
      />

      <Secao titulo="Sobre" />
      <div className="flex items-center gap-3 card-mb bg-card p-4 ring-1 ring-border">
        <MeloAvatar className="h-14 w-14" rounded="rounded-2xl" />
        <div>
          <p className="text-xl font-extrabold text-brown">Money Bee</p>
          <p className="text-sm font-semibold text-muted-foreground">Versão 1.0.6 · Feito com abelha e mel</p>
        </div>
      </div>

      {/* Card informativo */}
      <div className="flex gap-3 rounded-3xl bg-secondary p-4 ring-1 ring-border">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-sm font-semibold leading-relaxed text-muted-foreground">
          Suas configurações ficam salvas neste dispositivo. Ocultar saldos é ideal quando você está em público e
          não quer ninguém espiando seus valores.
        </p>
      </div>

      {/* Restaurar padrões */}
      <button
        type="button"
        onClick={restaurarPadroes}
        className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-destructive/30 bg-destructive/5 py-4 text-lg font-extrabold text-destructive transition-transform active:scale-[0.98]"
      >
        <RotateCcw className="h-5 w-5" strokeWidth={2.5} />
        Restaurar padrões
      </button>

      <p className="pt-2 text-center text-sm font-bold text-primary">
        Money Bee · seu dinheiro, doce como mel
      </p>
    </div>
  )
}
