import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackPopupService {
  constructor(private snackBar: MatSnackBar) {}

  durationInSeconds: number = 10;

  showFeedback(message: string) {
    this.snackBar
      .open(message, 'Close', {
        duration: this.durationInSeconds * 1000,
      })
      .afterDismissed()
      .subscribe(() => {});
  }
}
