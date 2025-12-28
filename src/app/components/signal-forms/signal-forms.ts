import { Component, effect, signal } from '@angular/core';
import { form, Field, required, email, LogicFn, OneOrMany, PathKind, SchemaPath, SchemaPathRules, ValidationError, debounce, validate, submit } from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-signal-forms',
  imports: [Field],
  templateUrl: './signal-forms.html',
  styleUrl: './signal-forms.css',
})
export class SignalForms {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (model) => {
    email(model.email, { message: 'Email format is invalid' }),
      required(model.email, { message: 'Email is required' }),
      required(model.password, { message: 'Password is required' });
    debounce(model.email, 500);

    validate(model.email, (email) => {
      if (email.value().includes('Guido')) {
        return { message: 'Email is not valid', kind: 'error' };
      }
      return null;
    })
  });

  constructor() {
    // ✅ This is the equivalent of formGroup.valueChanges
    effect(() => {
      console.log(this.loginForm().value());
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    console.log({
      model: this.loginModel(),
      form: this.loginForm().value(),
      valid: this.loginForm().valid(),
      errors: this.loginForm().errors(),
    });

    submit(this.loginForm, async () => {
      console.log('Form submitted');

      this.loginForm().reset();
      this.loginModel.set({
        email: '',
        password: '',
      });
    })
  }
}

