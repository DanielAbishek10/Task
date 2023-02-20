import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerListComponent } from './checker-list.component';

describe('CheckerListComponent', () => {
  let component: CheckerListComponent;
  let fixture: ComponentFixture<CheckerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
