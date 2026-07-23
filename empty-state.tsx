import { MeloAvatar } from "./melo-avatar"

export function EmptyState({
  titulo,
  descricao,
}: {
  titulo: string
  descricao: string
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
      <MeloAvatar className="h-20 w-20 animate-float-bee" rounded="rounded-3xl" />
      <p className="mt-4 text-xl font-extrabold text-brown text-balance">{titulo}</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground text-pretty">{descricao}</p>
    </div>
  )
}
