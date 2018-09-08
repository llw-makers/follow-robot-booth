import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CardReaderService } from '../../providers/card-reader.service';

@Component({
  selector: 'app-card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.scss']
})
export class CardReaderComponent implements OnInit, OnDestroy {

  constructor(
    private cardReader: CardReaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cardReader.start();
    this.cardReader.card.subscribe((card) => {
      console.log(`Card UID: ${card.uid}`);
      this.router.navigateByUrl("/upload");
    });
  }

  ngOnDestroy() {
    this.cardReader.stop();
  }

}
