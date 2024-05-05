import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastr: ToastrService) { }

  showSuccess(message:any,title:any){
    this._toastr.success(message, title)
  }

  showError(message:any,title:any){
    this._toastr.error(message, title)

  }

  showInfo(message:any,title:any){
    this._toastr.info(message, title) 
  }

  showWarning(message:any,title:any){
    this._toastr.warning(message, title) 
  }
}
