"use client"

// Input de valor em Reais. Armazena centavos internamente,
// exibe "R$ 0,00" e monta o número da direita para a esquerda.
export function CurrencyInput({
  centavos,
  onChange,
  cor = "text-primary",
}: {
  centavos: number
  onChange: (centavos: number) => void
  cor?: string
}) {
  const reais = (centavos / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault()
      onChange(centavos * 10 + Number(e.key))
    } else if (e.key === "Backspace") {
      e.preventDefault()
      onChange(Math.floor(centavos / 10))
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-primary/60 bg-white px-4 py-3.5">
      <span className="text-xl font-extrabold text-brown">R$</span>
      <input
        inputMode="numeric"
        value={reais}
        onKeyDown={handleKey}
        onChange={() => {}}
        aria-label="Valor em reais"
        className={`w-full bg-transparent text-xl font-extrabold outline-none ${cor}`}
      />
    </div>
  )
}
