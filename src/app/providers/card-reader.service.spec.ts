import { TestBed, inject } from '@angular/core/testing';

import { CardReaderService } from './card-reader.service';

describe('CardReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardReaderService]
    });
  });

  it('should be created', inject([CardReaderService], (service: CardReaderService) => {
    expect(service).toBeTruthy();
  }));
});
