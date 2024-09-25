import OpenAI from "openai";
import { promptToConvertImagesToJson } from "../utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const filesToJson = async (files: any[]) => {
  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
    ? process.env.REACT_APP_GOOGLE_API_KEY
    : "";
  console.log("googleApiKey", googleApiKey);
  const genAI = new GoogleGenerativeAI(googleApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", maxTokens: 10000 });

  let input: any[] = [promptToConvertImagesToJson];
  for (let i = 0; i < files.length; i++) {
    const image = [
      {
        inlineData: {
          data: files[i].file,
          mimeType: files[i].type,
        },
      },
    ];
    input.push(image);
  }
  const result = await model.generateContent(input);
  let documents = "";
  if (
    result?.response?.candidates &&
    result?.response?.candidates[0].content.parts[0].text
  ) {
    documents = result?.response?.candidates[0].content.parts[0].text;
    console.log(result?.response?.candidates[0].content.parts[0].text);
  }
  return documents;
};

export const processFiles = async (
  files: any,
  prompt: string
): Promise<string> => {
  let jsons = "";
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    jsons += files[index] + ", ";
  }
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt + " " + jsons }],
    model: "gpt-4o",
  });
  console.log("Respuesta del proceso de conciliacion:");
  console.log(completion.choices[0].message.content);
  const jsonResult = completion.choices[0].message.content;

  const promptToValidateJson = `por favor verifica si el json es correcto. en caso de que si retornarlo tal como esta en caso contrario ajustarlo correctamente. Si el mismo tiene operaciones a realizar (ejemplo 2 + 5), realizalas. 
Es importante que solo me respondas con el json final
Aqui te dejo el json a validar:

`;
  const completionVerify = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          promptToValidateJson +
          " \n Aqui tienes los jsons de entrada: " +
          jsonResult,
      },
    ],
    model: "gpt-4o",
  });

  const finalResult = completion.choices[0].message.content;

  return finalResult ? finalResult : "";
};
