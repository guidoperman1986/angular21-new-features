import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  pages = [
    { label: 'Signal Forms', path: 'signal-forms' },
    { label: 'Http Resource', path: 'http-resource' },
    { label: 'Zoneless', path: 'zoneless' },
    { label: 'Angular Aria', path: 'angular-aria' },
    { label: 'Control Flow', path: 'control-flow' },
    { label: 'Dynamic Components', path: 'dynamic-components' },
    { label: 'Signals', path: 'signals' },
  ];
}
