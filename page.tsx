"use client"

import { useEffect, useState } from "react"
import { StoreProvider } from "@/lib/store"
import { AppHeader } from "@/components/app-header"
import { BottomNav, type Aba } from "@/components/bottom-nav"
import { SplashScreen } from "@/components/splash-screen"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { HomeScreen } from "@/components/screens/home-screen"
import { ExtratoScreen } from "@/components/screens/extrato-screen"
import { GraficosScreen } from "@/components/screens/graficos-screen"
import { MetasScreen } from "@/components/screens/metas-screen"
import { MeloScreen } from "@/components/screens/melo-screen"
import { ConfigScreen } from "@/components/screens/config-screen"

function App() {
  const agora = new Date()
  const [aba, setAba] = useState<Aba>("inicio")
  const [config, setConfig] = useState(false)
  const [ano, setAno] = useState(agora.getFullYear())
  const [mes, setMes] = useState(agora.getMonth())
  const [modal, setModal] = useState<"receita" | "despesa" | null>(null)
  const [splash, setSplash] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2200)
    return () => clearTimeout(t)
  }, [])

  const mudarMes = (a: number, m: number) => {
    setAno(a)
    setMes(m)
  }

  const abrirConfig = () => setConfig(true)

  const navegar = (a: Aba) => {
    setConfig(false)
    setAba(a)
  }

  return (
    // Moldura de celular centralizada no desktop
    <div className="flex min-h-screen items-center justify-center bg-[#e9dcc0] py-0 sm:py-6">
      <div className="honeycomb-bg relative flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-cream shadow-2xl sm:h-[860px] sm:rounded-[2.5rem] sm:ring-8 sm:ring-[#5a3210]/10">
        {splash ? (
          <SplashScreen />
        ) : (
          <>
            <AppHeader
              onSettings={abrirConfig}
              onReceita={() => setModal("receita")}
              onDespesa={() => setModal("despesa")}
            />

            <main className="no-scrollbar flex-1 overflow-y-auto">
              {config ? (
                <ConfigScreen />
              ) : aba === "inicio" ? (
                <HomeScreen
                  ano={ano}
                  mes={mes}
                  onMudarMes={mudarMes}
                  onReceita={() => setModal("receita")}
                  onDespesa={() => setModal("despesa")}
                />
              ) : aba === "extrato" ? (
                <ExtratoScreen ano={ano} mes={mes} onMudarMes={mudarMes} />
              ) : aba === "graficos" ? (
                <GraficosScreen ano={ano} mes={mes} onMudarMes={mudarMes} />
              ) : aba === "metas" ? (
                <MetasScreen />
              ) : (
                <MeloScreen />
              )}
            </main>

            <BottomNav ativa={aba} onNavegar={navegar} />

            <AddTransactionModal tipo={modal} onFechar={() => setModal(null)} />
          </>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}
