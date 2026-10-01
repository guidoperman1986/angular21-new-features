import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiChatService } from '../../services/ai-chat';

@Component({
  imports: [FormsModule],
  selector: 'app-ai-chat',
  styleUrl: './ai-chat.css',
  templateUrl: './ai-chat.html',
})
export class AiChat {
  private aiChatService = inject(AiChatService);

  userPrompt = signal<string>('');
  aiResponse = signal<string>('');
  isLoading = signal<boolean>(false);

  async sendPrompt() {
    const prompt = this.userPrompt().trim();
    if (!prompt) return;

    this.isLoading.set(true);

    // Obtenemos el Signal reactivo que se actualizará en tiempo real
    const streamSignal = this.aiChatService.generateStream(prompt);

    // Vinculamos la respuesta a nuestro componente
    // Cada actualización del stream refrescará automáticamente la UI
    this.aiResponse = streamSignal;

    // Limpiamos el input
    this.userPrompt.set('');
    this.isLoading.set(false);
  }
}
