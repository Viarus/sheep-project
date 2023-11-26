import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastrService: ToastrService) {
  }

  public handleError(error: Error | string | unknown): void {
    this.showErrorMessage(this.getErrorMessage(error));
  }

  private showErrorMessage(message: string) {
    this.toastrService.error(message, 'Error');
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
