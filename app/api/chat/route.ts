import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Messages array is required", { status: 400 })
    }

    const userMessage = messages[messages.length - 1].content
    let botReply = "Sorry, I couldn't process your request."

    try {
      // Timeout controller: abort request if longer than 30s
      const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 60000) // 60 seconds

      const res = await fetch(
        "https://api-inference.huggingface.co/models/distilgpt2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: userMessage }),
          signal: controller.signal,
        }
      )

      clearTimeout(timeout)

      if (res.ok) {
        const data = await res.json()
        botReply = data[0]?.generated_text || data.generated_text || botReply
      } else {
        console.warn("distilgpt2 model failed:", await res.text())
      }
    } catch (err) {
      console.error("Error calling distilgpt2 model:", err)
    }

    return new Response(
      JSON.stringify({ role: "assistant", content: botReply }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (err) {
    console.error("Error in chat API:", err)
    return new Response("Failed to generate response", { status: 500 })
  }
}
