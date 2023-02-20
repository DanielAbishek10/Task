import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverstmentComponent } from './inverstment.component';

describe('InverstmentComponent', () => {
  let component: InverstmentComponent;
  let fixture: ComponentFixture<InverstmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InverstmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InverstmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
