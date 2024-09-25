import OpenAI from "openai";
import { promptToConvertImagesToJson } from "../utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function convertPDFToImages(pdfData: ArrayBuffer): Promise<string[]> {
  console.log("Starting PDF to images conversion");
  const pdf: PDFDocumentProxy = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const images: string[] = [];
  console.log(`PDF loaded with ${pdf.numPages} pages`);

  for (let i = 1; i <= pdf.numPages; i++) {
    console.log(`Processing page ${i}`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context!, viewport: viewport }).promise;
    const imageDataUrl = canvas.toDataURL('image/png');
    images.push(imageDataUrl);
    console.log(`Page ${i} converted to image`);
  }

  console.log("PDF to images conversion completed");
  return images;
}

export const filesToJsonOpenAI = async (files: File[]): Promise<string> => {
  console.log("Starting files to JSON conversion with OpenAI");
  let documents = "";
  const messages: any[] = [
    { role: "system", content: promptToConvertImagesToJson },
    { role: "user", content: [
      { type: "text", text: "Please analyze these documents and convert them to JSON:" },
    ] },
  ];

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(`File ${file.name} read as data URL`);
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error(`Error reading file ${file.name}:`, error);
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  for (const file of files) {
    console.log(`Processing file: ${file.name}`);
    let imageDataUrls: string[];

    if (file.type === 'application/pdf') {
      console.log(`File ${file.name} is a PDF`);
      const pdfData = await file.arrayBuffer();
      imageDataUrls = await convertPDFToImages(pdfData);
    } else if (file.type.startsWith('image/')) {
      console.log(`File ${file.name} is an image`);
      imageDataUrls = [await readFileAsDataURL(file)];
    } else {
      console.warn(`Unsupported file type: ${file.type}`);
      continue;
    }

    for (const dataUrl of imageDataUrls) {
      messages[1].content.push({
        type: "image_url",
        image_url: { url: dataUrl },
      });
      console.log(`Added image data URL to messages for file: ${file.name}`);
    }
  }

  try {
    console.log("Sending request to OpenAI API");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 4096,
    });

    if (completion.choices && completion.choices[0].message.content) {
      documents = completion.choices[0].message.content;
      console.log("OpenAI Vision API response:", documents);
    }
  } catch (error) {
    console.error("Error processing files with OpenAI Vision API:", error);
  }

  console.log("Files to JSON conversion with OpenAI completed");
  return documents;
};

export const filesToJson = async (files: any[]) => {
  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY
    ? process.env.REACT_APP_GOOGLE_API_KEY
    : "";
  console.log("googleApiKey", googleApiKey);
  const genAI = new GoogleGenerativeAI(googleApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
  
  console.log("gemini input", input);

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
