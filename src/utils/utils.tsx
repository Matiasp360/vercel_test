import OpenAI from "openai";

export const extractName = (text: string): string => {
    const regex = /sandbox:(\/mnt\/data\/.*\.xlsx)/;
    const match = text.match(regex);
    return match ? match[1] : '';
};

export const downloadFile = (file: Blob, fileName: string) => {
    const url = URL.createObjectURL(file);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
}

export const awaitForThredAndAnalyzeQuery =(threadId: string, assistantId:string, openai: OpenAI): Promise<string> => {
    let finalText = '';
    return new Promise((resolve, reject) => {
        const run = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId
        })
          .on('textCreated', (text) => {
            if (text && typeof text === 'object' && text.value) {
              finalText += text.value;
            } else if (typeof text === 'string') {
              finalText += text;
            }
          })
          .on('textDelta', (textDelta, snapshot) => {
            if (textDelta && textDelta.value) {
              if (typeof textDelta.value === 'string') {
                finalText += textDelta.value;
              } else if (typeof textDelta.value === 'object' && textDelta.value) {
                finalText += textDelta.value;
              }
            }
          })
          .on('end', async () => {
            console.log("Processing complete.");
            console.log("Final text:", finalText);
            
            const queryResult = await analyzeAndQuery(finalText);

            resolve(queryResult);
          })
          .on('error', (error) => {
            console.error("An error occurred:", error);
            reject(error);
          });
      });
}

export async function analyzeAndQuery(text: string): Promise<string> {
  if (text.includes("sandbox:/mnt/data"))
    return extractName(text);

  return "";
}

export const defaultPrompt = `
Conciliar cada factura con el monto de la orden de pago y la retencion realizada

La conciliacion es el calculo: total de la factura, menos la orden de pago, menos la retencion, y la conciliacion es esa diferencia.

Solo hay una retencion por documento

Devolver solo un json con los resultados de cada factura indicando su 
Numero de Factura	Monto de Factura	
Monto de Pago	
Monto de Retencion	
Diferencia y su Conciliacion usando los datos de cada factura.



NO AGREGAR NINGUN CHAT NI ACLARACION DE RESULTADO SOLO JSON
REVISAR QUE EL FORMATO DEL JSON SEA CORRECTO ANTES DE ENVIAR REVISAR LLAVES Y ESPACIOS`;

export const promptToConvertImagesToJson = "Convertime estas archivos en formato json bien estructurado en keys/values. Es importante responderme solo con el json y que proceses todos los archivos, tanto pdfs, png y jpeg"