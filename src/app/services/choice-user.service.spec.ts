import { TestBed } from '@angular/core/testing';

import { ChoiceUserUserService } from './choice-user.service';

describe('ChoiceUserService', () => {
  let service: ChoiceUserUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoiceUserUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
