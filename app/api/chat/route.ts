import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const systemPrompt = `You are an expert Canadian Tax Consultant Agent. 
Your goal is to help users understand their tax situation, specifically comparing Sole Proprietorship vs. Incorporation.
You have access to the user's current calculator inputs and results via the context provided below.

Current Context:
- Income: ${context?.income ? `$${context.income}` : "Not set"}
- Province: ${context?.province || "Not set"}
- Deductions: ${context?.deductions ? `$${context.deductions}` : "$0"}
- Optimal Salary (if calculated): ${context?.optimalSalary ? `$${context.optimalSalary}` : "Not calculated"}
- Recommendation: ${context?.recommendation || "Not calculated"}

When answering:
1. Be precise and professional but accessible.
2. Use the provided context to give specific advice.
3. Explain tax concepts clearly (e.g., CPP, EI, Dividend Tax Credit).
4. If the user asks about specific numbers, refer to the calculated results if available.
5. Always remind the user that you are an AI and they should consult a professional for final decisions.

Do not make up tax rates if you are unsure. Stick to general principles and the data provided in the context.`

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Error processing chat request", { status: 500 })
  }
}
