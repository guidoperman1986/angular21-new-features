import { Component, injectAsync, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounce, form, FormField, required, validate } from '@angular/forms/signals';

interface userPromptModel {
  prompt: string;
}

@Component({
  imports: [FormField],
  selector: 'app-ai-chat',
  styleUrl: './ai-chat.css',
  templateUrl: './ai-chat.html',
})
export class AiChat {
  private aiChatService = injectAsync(() =>
    import('../../services/ai-chat').then((m) => m.AiChatService),
  );

  userPromptModel = signal<userPromptModel>({
    prompt: '',
  });

  promptForm = form(this.userPromptModel, (model) => {
    required(model.prompt, { message: 'Prompt is required' });
    debounce(model.prompt, 500);

    validate(model.prompt, (prompt) => {
      if (prompt.value().includes('Guido')) {
        return { message: 'Prompt is not valid', kind: 'error' };
      }
      return null;
    });
  });

  userPrompt = signal<string>('');
  aiResponse = signal<string>('');
  isLoading = signal<boolean>(false);

  async sendPrompt() {
    const prompt = this.userPrompt().trim();
    if (!prompt) return;

    this.isLoading.set(true);

    // Obtenemos el Signal reactivo que se actualizará en tiempo real
    const streamSignal = (await this.aiChatService()).generateStream(prompt);

    // Vinculamos la respuesta a nuestro componente
    // Cada actualización del stream refrescará automáticamente la UI
    this.aiResponse = streamSignal;

    // Limpiamos el input
    this.userPrompt.set('');
    this.isLoading.set(false);
  }
}
