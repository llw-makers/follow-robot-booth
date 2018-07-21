import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImagesService } from '../../providers/images.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  images: SafeUrl[] = [];
  imageUrls: string[] = [];

  constructor(
    private imageService: ImagesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.imageService.images) {
      this.imageUrls = this.imageService.images.map((blob) => {
        return this.getURLForBlob(blob);
      });
      this.images = this.imageUrls.map((url) => {
        return this.sanitizer.bypassSecurityTrustUrl(url);
      });
    }
  }

  ngOnDestroy() {
    if (this.imageService.images) {
      this.imageUrls.forEach((url) => {
        window.URL.revokeObjectURL(url);
      });
    }
  }

  getURLForBlob(blob) {
    return window.URL.createObjectURL(blob);
  }

}
