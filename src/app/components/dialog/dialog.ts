import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  isOpen = input<boolean>(false);
  title = input<string>('');
  content = input<string>('');

  onClose = output<void>();


}
