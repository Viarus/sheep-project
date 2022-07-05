import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastrService: ToastrService) {
  }

  public handleError(error: any): void {
    this.toastrService.error(ErrorHandlerService.getErrorMessage(error), 'Error');
  }

  private static getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    return String(error)
  }
}
