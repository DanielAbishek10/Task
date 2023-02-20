import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from 'src/app/modules/paymentDetails';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-checker-page',
  templateUrl: './checker-page.component.html',
  styleUrls: ['./checker-page.component.css']
})
export class CheckerPageComponent implements OnInit {
  public paymentDetail:any;
  public isChecker = false;

  constructor(private paymentDetailsService$: PaymentDetailsService,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    if (this.paymentDetailsService$.currentUser.profileData == 'checker'){
      this.isChecker = true
    }
    this.paymentDetailsService$.verificationDetail.subscribe(data =>{
      this.paymentDetail = data
    })
  }
  updateStatus(status:string){
    let query = {
      ID: this.paymentDetail.ID,
      statuscode:status
    }
    if(this.isChecker){

      this.paymentDetailsService$.updateStatus(query).subscribe(res => {
        this.paymentDetail=null
        this._snackBar.open(status=='accepted'?'Successfully Accepted':'This Request Was Successfully Rejected','',{
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration:5000,
          panelClass:[status=='accepted'?'success':'warning']
        });
      })
    }
    else{
      this._snackBar.open('Sorry Please login as Checker','',{
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:5000,
        panelClass:['warning']
      });
  
    }
  }

}
