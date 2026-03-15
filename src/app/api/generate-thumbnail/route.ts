import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request){

  try{

    const formData = await req.formData()
    const prompt = formData.get("prompt") as string

    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-image-preview"
    })

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt }
          ]
        }
      ]
    })

    const response = await result.response
    const parts = response.candidates?.[0]?.content?.parts

    const imagePart = parts?.find((p:any)=>p.inlineData)

    const base64 = imagePart.inlineData.data

    const buffer = Buffer.from(base64,"base64")

    return new Response(buffer,{
      headers:{ "Content-Type":"image/png" }
    })

  }catch(err){

    console.error(err)

    return Response.json(
      { error:"Gemini image generation failed" },
      { status:500 }
    )

  }
}