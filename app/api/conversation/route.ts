import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    // como sabe que está esta propiedad ??
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    console.log({ oscar: userId });
    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    // si no cae por el !freeTrial hacemos la petición e incrementamos uno despues
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    await increaseApiLimit();
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal eror", { status: 500 });
  }
}
