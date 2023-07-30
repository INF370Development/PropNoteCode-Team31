import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-broker-model',
  templateUrl: './broker-model.component.html',
  styleUrls: ['./broker-model.component.scss']
})
export class BrokerModelComponent {
  constructor(public dialogRef: MatDialogRef<BrokerModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
