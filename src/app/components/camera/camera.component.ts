import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImagesService } from '../../providers/images.service';
import ImageCapture from '../../ImageCapture';

enum CameraComponentState {
  Countdown3,
  Countdown2,
  Countdown1,
  TakingPhotos,
  Complete
}

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {

  CameraComponentState = CameraComponentState;

  @ViewChild("videoElement") videoElement: ElementRef;
  video: HTMLVideoElement;
  stream: MediaStream;
  imageCapture: any;
  images: Blob[] = null;

  state: CameraComponentState;
  interval: any = null;
  current = 0;
  photoDuration = 10000;
  photosTaken = 0;

  isTakingPhoto = false;

  constructor(
    private router: Router,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
      this.stream = stream;
      this.video.srcObject = stream;
      this.video.play();
      this.imageCapture = new ImageCapture(this.stream.getVideoTracks()[0]);
    });
  }

  ngOnDestroy() {
    if (this.stream) {
      this.imageCapture = null;
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  takePhoto() {
    this.isTakingPhoto = true;
    this.state = CameraComponentState.Countdown3;
    this.current = 0;
    this.photosTaken = 0;
    this.images = [];
    this.interval = setInterval(() => {
      if (this.state < CameraComponentState.TakingPhotos) {
        this.state++;
      } else if (this.state === CameraComponentState.TakingPhotos) {
        this.current = this.photoDuration - 1000;
        this.imageCapture.grabFrame().then(async (image) => {
          let canvas = document.createElement("canvas");
          canvas.setAttribute("width", image.width);
          canvas.setAttribute("height", image.height);
          let ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, image.width, image.height);
          let blob = await new Promise((res: (Blob) => void, rej) => {
            canvas.toBlob(res);
          });
          this.images.push(blob);
          if (this.images.length >= this.photoDuration / 1000) {
            this.imagesService.images = this.images;
            this.router.navigateByUrl("/images");
          }
        });
        this.photosTaken++;
        if (this.photosTaken >= this.photoDuration / 1000) {
          this.state = CameraComponentState.Complete;
        }
      }
    }, 1000);
  }

  cancel() {
    this.isTakingPhoto = false;
    this.images = null;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
