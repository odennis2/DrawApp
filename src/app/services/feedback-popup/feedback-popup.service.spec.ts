import { TestBed } from '@angular/core/testing';
import { FeedbackPopupService } from './feedback-popup.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FeedbackPopupService', () => {
  let service: FeedbackPopupService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackPopupService, MatSnackBar],
      imports: [MatSnackBarModule, NoopAnimationsModule],
    });
    service = TestBed.inject(FeedbackPopupService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with the given message', () => {
    const openSpy = spyOn(snackBar, 'open').and.callThrough();
    const message = 'Test message';

    service.showFeedback(message);

    expect(openSpy).toHaveBeenCalledWith(message, 'Close', {
      duration: service.durationInSeconds * 1000,
    });
  });
});
