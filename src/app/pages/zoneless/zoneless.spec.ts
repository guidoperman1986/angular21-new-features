import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zoneless } from './zoneless';

describe('Zoneless', () => {
  let component: Zoneless;
  let fixture: ComponentFixture<Zoneless>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zoneless]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zoneless);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
