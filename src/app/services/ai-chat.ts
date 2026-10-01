import { inject, Service, signal, WritableSignal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Service()
export class AiChatService {
  private ai = new GoogleGenAI({ apiKey: '' });

  generateStream(prompt: string): WritableSignal<string> {
    const responseText = signal<string>('');

    this.streamProcess(prompt, responseText);

    return responseText;
  }

  private async streamProcess(prompt: string, textSignal: WritableSignal<string>) {
    try {
      // Usamos el modelo rápido por defecto gemini-2.5-flash
      const responseStream = await this.ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // Iteramos sobre los fragmentos (chunks) a medida que van llegando
      for await (const chunk of responseStream) {
        if (chunk.text) {
          // Actualizamos el Signal acumulando el texto progresivamente
          textSignal.update((current) => current + chunk.text);
        }
      }
    } catch (error) {
      console.error('Error al generar contenido:', error);
      textSignal.set('Ocurrió un error al procesar la solicitud.');
    }
  }
}
