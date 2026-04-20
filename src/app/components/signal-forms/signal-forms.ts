import { Component, effect, signal } from '@angular/core';
import {
  debounce,
  email,
  form,
  FormField,
  required,
  submit,
  validate,
} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-signal-forms',
  imports: [FormField],
  templateUrl: './signal-forms.html',
  styleUrl: './signal-forms.css',
})
export class SignalForms {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  loginForm = form(this.loginModel, (model) => {
    (email(model.email, { message: 'Email format is invalid' }),
      required(model.email, { message: 'Email is required' }),
      required(model.password, { message: 'Password is required' }));
    debounce(model.email, 500);

    validate(model.email, (email) => {
      if (email.value().includes('Guido')) {
        return { message: 'Email is not valid', kind: 'error' };
      }
      return null;
    });

    validate(model.confirmPassword, ({value, valueOf}) => {
      if (value() !== valueOf(model.password)) {
        return { message: 'Passwords do not match', kind: 'error' };
      }
      return null;
    });
  });

  constructor() {
    // ✅ This is the equivalent of formGroup.valueChanges
    effect(() => {
      console.log(this.loginForm().value());
    });
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
        confirmPassword: '',
      });
    });
  }
}
