import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResource } from './http-resource';

describe('HttpResource', () => {
  let component: HttpResource;
  let fixture: ComponentFixture<HttpResource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpResource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResource);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
