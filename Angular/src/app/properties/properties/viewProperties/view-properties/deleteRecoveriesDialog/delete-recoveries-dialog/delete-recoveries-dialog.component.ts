import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-delete-recoveries-dialog',
  templateUrl: './delete-recoveries-dialog.component.html',
  styleUrls: ['./delete-recoveries-dialog.component.scss']
})
export class DeleteRecoveriesDialogComponent {
  @Output() confirmDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDeleteConfirmed() {
    this.confirmDelete.emit(true);
  }

  onCancel() {
    this.confirmDelete.emit(false);
  }
}