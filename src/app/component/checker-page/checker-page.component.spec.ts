import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerPageComponent } from './checker-page.component';

describe('CheckerPageComponent', () => {
  let component: CheckerPageComponent;
  let fixture: ComponentFixture<CheckerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
