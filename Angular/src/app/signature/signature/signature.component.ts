import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})

export class SignatureComponent implements OnInit {
  @ViewChild('signaturePad', { static: true }) signaturePadElement: ElementRef;
  signaturePad: SignaturePad;

  constructor() {}

  ngOnInit() {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      backgroundColor: "rgb(250, 250, 250)",
    });

    const clearButton = document.getElementById("clear");
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        this.signaturePad.clear();
      });
    }
  }

  ngAfterViewInit() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = this.signaturePadElement.nativeElement;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.scale(ratio, ratio);
  }
}