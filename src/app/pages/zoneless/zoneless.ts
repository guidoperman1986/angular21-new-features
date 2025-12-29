import { ChangeDetectorRef, Component, signal } from '@angular/core';

@Component({
  selector: 'app-zoneless',
  imports: [],
  templateUrl: './zoneless.html',
  styleUrl: './zoneless.css',
})
export class Zoneless {
  traditionalValue = 0;
  signalValue = signal(0);

  constructor(private cdr: ChangeDetectorRef) {}

  updateTraditional() {
    setTimeout(() => {
      this.traditionalValue++;
      console.log('Updated traditional value to:', this.traditionalValue);
      // In Zoneless, this won't reflect in UI unless we call cdr.markForCheck()
      /* this.cdr.markForCheck(); */
    }, 1000);
  }

  updateSignal() {
    setTimeout(() => {
      this.signalValue.update((v) => v + 1);
    }, 1000);
  }

  forceCheck() {
    this.cdr.detectChanges();
  }
}
