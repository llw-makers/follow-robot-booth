import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

export interface Card {
  uid: string;
}

export interface CardReader {
  start();
  stop();
  card: EventEmitter<Card>;
}

@Injectable({
  providedIn: 'root'
})
export class CardReaderService {
  private reader: CardReader;
  public currentCard: Card = null;
  private currentSubscription: Subscription = null;
  get card() {
    return this.reader && this.reader.card;
  }

  constructor() { }

  useReader(reader: CardReader) {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    this.reader = reader;
    this.currentSubscription = this.card.subscribe((card: Card) => {
      this.currentCard = card;
    });
  }

  start() {
    this.reader.start();
  }

  stop() {
    this.reader.stop();
  }
}
