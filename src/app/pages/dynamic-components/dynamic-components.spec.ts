import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponents } from './dynamic-components';

describe('DynamicComponents', () => {
  let component: DynamicComponents;
  let fixture: ComponentFixture<DynamicComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
