import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MOCK_USER } from '../../models/user';
import { Card } from './card';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card);
    fixture.componentRef.setInput('user', MOCK_USER);
    component = fixture.componentInstance;
    
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
