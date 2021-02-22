import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceListComponent } from './choice-list.component';

describe('ChoiceListComponent', () => {
  let component: ChoiceListComponent;
  let fixture: ComponentFixture<ChoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
