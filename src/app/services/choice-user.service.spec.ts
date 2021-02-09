import { TestBed } from '@angular/core/testing';

import { ChoiceUserService } from './choice-user.service';

describe('ChoiceUserService', () => {
  let service: ChoiceUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoiceUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
