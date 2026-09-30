import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  min,
  minLength,
  required,
} from '@angular/forms/signals';
import { getWebMcpRegistry } from '../../webmcp-polyfill';

interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  newsletter: boolean;
}

const emptyRegistration = (): Registration => ({
  firstName: '',
  lastName: '',
  email: '',
  age: 18,
  newsletter: false,
});

const validAgentPayload = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  age: 36,
  newsletter: true,
};

const invalidAgentPayload = {
  firstName: 'Ada',
  lastName: '',
  email: 'not-an-email',
  age: 15,
  newsletter: false,
};

@Component({
  selector: 'app-web-mcp',
  imports: [FormField, FormRoot, JsonPipe],
  templateUrl: './web-mcp.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WebMcp {
  readonly model = signal(emptyRegistration());
  readonly users = signal<Registration[]>([]);
  readonly agentPayload = signal(JSON.stringify(validAgentPayload, null, 2));
  readonly lastAgentResult = signal<string>('');
  readonly registry = getWebMcpRegistry();

  readonly registerForm = form(
    this.model,
    (fields) => {
      required(fields.firstName, { message: 'First name is required' });
      minLength(fields.firstName, 2, { message: 'At least 2 characters' });
      required(fields.lastName, { message: 'Last name is required' });
      required(fields.email, { message: 'Email is required' });
      email(fields.email, { message: 'Email format is invalid' });
      min(fields.age, 18, { message: 'Must be 18+' });
    },
    {
      experimentalWebMcpTool: {
        name: 'registerUser',
        description: 'Registers a new user. Use this instead of filling the DOM form.',
      },
      submission: {
        action: async (field) => {
          this.users.update((list) => [...list, { ...field().value() }]);
          this.model.set(emptyRegistration());
          field().reset();
        },
      },
    },
  );

  loadValidPayload() {
    this.agentPayload.set(JSON.stringify(validAgentPayload, null, 2));
  }

  loadInvalidPayload() {
    this.agentPayload.set(JSON.stringify(invalidAgentPayload, null, 2));
  }

  onPayloadInput(event: Event) {
    this.agentPayload.set((event.target as HTMLTextAreaElement).value);
  }

  async callRegisterUser() {
    const registry = this.registry;
    if (!registry) {
      this.lastAgentResult.set('No navigator.modelContext. The playground polyfill did not install.');
      return;
    }

    let args: unknown;
    try {
      args = JSON.parse(this.agentPayload());
    } catch {
      this.lastAgentResult.set('Payload is not valid JSON.');
      return;
    }

    const result = await registry.callTool('registerUser', args);
    this.lastAgentResult.set(JSON.stringify(result, null, 2));
  }
}
