import { MeloAvatar } from "./melo-avatar"

export function SplashScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#f7c948] to-[#f5d76e] px-8">
      <div className="animate-pop-in flex flex-col items-center">
        <MeloAvatar className="h-40 w-40 shadow-2xl" rounded="rounded-[2rem]" />
        <h1 className="mt-6 text-4xl font-extrabold text-[#6b3410]">Money Bee</h1>
        <p className="mt-2 text-lg font-bold text-[#8b4513]">Suas finanças em ordem!</p>
      </div>
      <div className="mt-10 flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#c0851f] [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#8b4513] [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-[#c0851f]" />
      </div>
    </div>
  )
}
