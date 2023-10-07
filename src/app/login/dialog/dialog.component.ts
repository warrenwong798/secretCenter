import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface LoginData {
  team: string;
  username: string;
  email: string;
  password: string;
  login: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  login: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
  ) {
    this.login = data.login;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
