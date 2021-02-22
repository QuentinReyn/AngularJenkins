import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceFormComponent } from './choice-form.component';

describe('ChoiceFormComponent', () => {
  let component: ChoiceFormComponent;
  let fixture: ComponentFixture<ChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
