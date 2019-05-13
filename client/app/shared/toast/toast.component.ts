import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(public snackBar: MatSnackBar) { }

  open(message: string, cssClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    config.panelClass = [cssClass];
    this.snackBar.open(message, 'X', config);
  }
}
