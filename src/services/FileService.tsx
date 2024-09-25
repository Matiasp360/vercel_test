import OpenAI from "openai";
import { FilesUploaded } from "../types";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
});

export const uploadFiles = async (fileBuffer: string) => {
    // const file = await openai.files.create({
    //     file: fileBuffer,
    //     purpose: 'assistants',
    //   });

    const content = `El modelo P360, diseñado como conciliador de pagos, debe recibir y analizar documentos como órdenes de pago, comprobantes de transferencia y certificados de retención. Su tarea inicial es clasificar estos documentos en las categorías mencionadas. Un solo archivo puede contener múltiples tipos de documentos, como comprobantes y facturas, y el modelo debe identificar y procesar cada tipo de documento por separado dentro del mismo archivo.

La informacion biene en tipo texto, de archivos ya procesados, los mismos se separan con ------.

Una vez extraída la información, el modelo debe verificar los duplicados comparando los datos extraídos con el registro existente en el archivo Excel. Es esencial que antes de agregar cualquier nuevo registro, el modelo verifique que estos no estén duplicados con los registros ya existentes. Si se detectan duplicados, estos deben ser marcados en una sección especial del archivo Excel. A su vez si no se puede procesar el archivo agregarlo a esa seccion con su motivo. Esta seccion  "seccion de errores" debe estar en otra hoja del excel con columna nombre_archivo y motivo.

La información extraída debe ser consolidada en una tabla de Excel con columnas específicas: fecha de emisión de factura, fecha de retención, fecha de comprobante de pago, razón social, CUIT, ID factura, monto factura, ID orden de pago, monto orden de pago, ID comprobante de pago, monto comprobante de pago, ID certificación retención, monto certificado retención, total recibido y saldo a pagar. Estas columnas deben estar siempre presentes en el archivo Excel generado como tambien la hoja de errores para cargar los archivos que no se pudieron procesar.
Los datos de total_recibido y saldo_a_pagar deben ser calucados automaticamente

El archivo Excel generado debe ser incremental; por ejemplo, si hoy se procesan 10 archivos y luego se añaden 5 más, el Excel final debe contener la información de los 10 archivos iniciales más la de los 5 adicionales, asegurando siempre que no haya duplicados con los registros anteriores.

Finalmente, el modelo debe devolver únicamente el archivo Excel generado con la información consolidada, sin incluir explicaciones extensas sobre el proceso, ya que toda la información relevante debe estar contenida en el archivo Excel.

Por ultimo, tene en cuenta que en un unico archivo pueden venir varios tipos de documentos como una orden de pago con comprobantes de pago. Estos se deben de incluir en el excel como distintos registros

Recorda que solo me debes de responder con un excel en formato texto para yo poder armar`

    // return {fileId: file.id, fileName: file.filename, type: fileBuffer.type};
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": content},
          {"role": "user", "content": "Procesame los el siguiente texto que separa cada archivo con ------ Aqui estan: " + fileBuffer },],
      model: "gpt-4o",
    });

    console.log(completion);
    
};

export const getFiles = async () => {
  return await openai.files.list();
}

export const getIdFileByName = async (fileName: string) => {
    const files = await getFiles();
    const file = files.data.find(file => file.filename === fileName);
    return file?.id;
  }

export const downloadFileByName = async (fileName: string) => {
    const fileId = await getIdFileByName(fileName);
    if(fileId)
        return await openai.files.content(fileId);
    
    return null
  }

// export const deleteFiles = async (files: FilesUploaded[]) => {
//   files.forEach(async file => {
//     await openai.files.del(file.fileId);
//   });
// }
