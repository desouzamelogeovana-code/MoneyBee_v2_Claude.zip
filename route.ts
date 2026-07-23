import { generateText, type ModelMessage } from "ai"

export const maxDuration = 30

const SISTEMA = `Você é a Melo, a assistente virtual do aplicativo de finanças pessoais "Money Bee".
Personalidade: simpática, animada, acolhedora e levemente divertida, como uma abelhinha companheira.
Você chama o usuário carinhosamente de "abelhinha" de vez em quando.
Seu foco é EXCLUSIVAMENTE ajudar com finanças pessoais: organizar receitas, despesas, metas de economia,
dicas de orçamento e educação financeira simples.
Regras:
- Responda sempre em português do Brasil, com frases curtas e claras.
- Se perguntarem quem criou o app ou informações que você não tem, diga gentilmente que não tem acesso a isso e volte o foco às finanças.
- Não invente valores das transações do usuário; se precisar, use o resumo fornecido no contexto.
- Seja objetiva e prática. Use no máximo um emoji ocasional de abelha ou mel.`

export async function POST(req: Request) {
  try {
    const { messages, resumo } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[]
      resumo?: string
    }

    const modelMessages: ModelMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: resumo ? `${SISTEMA}\n\nResumo financeiro atual do usuário:\n${resumo}` : SISTEMA,
      messages: modelMessages,
    })

    return Response.json({ text })
  } catch (err) {
    console.log("[v0] Erro na rota da Melo:", err)
    return Response.json(
      { text: "Ops, tive um probleminha para responder agora. Tente de novo em instantes! 🐝" },
      { status: 200 },
    )
  }
}
