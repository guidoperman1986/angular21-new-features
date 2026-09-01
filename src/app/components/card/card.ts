import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.css',
})
export class Card {
  user = input.required<User>();
}
