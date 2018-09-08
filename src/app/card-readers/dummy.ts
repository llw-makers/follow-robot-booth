import { EventEmitter } from '@angular/core';
import { CardReader, Card } from '../providers/card-reader.service';

export class DummyCardReader implements CardReader {
  start() {
    (window as any).readCard = (card: Card) => {
      this.card.emit(card);
    };
  }

  stop() {
    delete (window as any).readCard;
  }

  card = new EventEmitter<Card>();
}
