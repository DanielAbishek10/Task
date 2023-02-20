
import { Location } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDetails } from '../../modules/paymentDetails';
import { PaymentDetailsService } from '../../service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  payment!:boolean;
  name ='';
  balance = 0;
  value = false;
  public paymentDetails!: PaymentDetails
  errorMsg:any

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private paymentDetailsService$: PaymentDetailsService, public matDialogRef: MatDialogRef<MessageBoxComponent>) { }

  ngOnInit(): void {
    this.checkPayment();
    

  }
  closeDialog(){
    this.matDialogRef.close()
  }
  checkPayment(){
    this.value = !(this.data.err)

    this.paymentDetailsService$.payment.subscribe((data:any) => {
      this.payment = data;
      if(this.payment){
        this.paymentDetails = this.data.paymentDetails
        this.errorMsg = this.data.paymentDetails
      }
      else{
        this.name = this.paymentDetailsService$.name;
      this.balance = this.paymentDetailsService$.balance;
      this.value = this.paymentDetailsService$.value;
  
      }
    })
  }
  loginPage(){
    location.reload()
  }

}
