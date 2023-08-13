import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateBrokerModalComponent } from './create-broker/create-broker-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [CreateBrokerModalComponent],
  exports: [CreateBrokerModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateBrokerModalModule {}
