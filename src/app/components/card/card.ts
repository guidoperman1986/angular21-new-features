import { Component, input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  user = input.required<User>();
}
