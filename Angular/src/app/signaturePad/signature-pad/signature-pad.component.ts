import { Component, ViewChild  } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent {
  signPad: any;
  @ViewChild('signPadCanvas', {static: false}) signaturePadElement:any;
  signImage:any;

  constructor() { }

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  startSignPadDrawing(event: Event) {
    console.log(event);
  }
  
  movedFinger(event: Event) {
  }
  
  undoSign() {
    const data = this.signPad.toData();
    if (data) {
      data.pop(); 
      this.signPad.fromData(data);
    }
  }
  
  clearSignPad() {
    this.signPad.clear();
  }
  
  saveSignPad() {
    const base64ImageData = this.signPad.toDataURL();
    this.signImage = base64ImageData;
  }
}