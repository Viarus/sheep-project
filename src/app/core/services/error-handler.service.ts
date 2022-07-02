import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastrService: ToastrService) {
  }

  public handleError(error: any) {
    this.toastrService.error(this.getErrorMessage(error), 'Error');
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    return String(error)
  }
}
