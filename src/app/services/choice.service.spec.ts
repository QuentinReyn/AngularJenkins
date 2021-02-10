import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ChoiceService } from './choice.service';

describe('ChoiceService', () => {
  let service: ChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
