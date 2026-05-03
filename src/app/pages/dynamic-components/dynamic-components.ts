import { Component, inputBinding, outputBinding, viewChild, ViewContainerRef } from '@angular/core';
import { Dialog } from '../../components/dialog/dialog';

@Component({
  selector: 'app-dynamic-components',
  imports: [],
  templateUrl: './dynamic-components.html',
  styleUrl: './dynamic-components.css',
})
export class DynamicComponents {
  container = viewChild.required('dialogContainer', { read: ViewContainerRef });

  createDynamicComponent() {
    const componentRef = this.container().createComponent(Dialog, {
      bindings: [
        inputBinding('isOpen', () => true),
        inputBinding('title', () => 'Dynamic Component'),
        inputBinding('content', () => 'This is a dynamic component'),
        outputBinding('onClose', () => this.container().clear()),
      ]
    });
  }
}
