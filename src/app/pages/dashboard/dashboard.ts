import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  pages = [
    { label: 'Signal Forms', path: 'signal-forms' },
    { label: 'Http Resource', path: 'http-resource' },
    { label: 'Zoneless', path: 'zoneless' },
    { label: 'Angular Aria', path: 'angular-aria' },
    { label: 'Control Flow', path: 'control-flow' },
  ];
}
