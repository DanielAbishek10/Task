import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from 'src/app/modules/paymentDetails';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  public pendingApprovalCount:any
  public paymentDetails!:PaymentDetails[]
public choice =''
public userDetails!:any
  constructor(private paymentDetailsService$:PaymentDetailsService) { }

  ngOnInit(): void {
    this.paymentDetailsService$.recentTransactionAPI.subscribe(()=>this.getListOfPendingTransactions())
    this.getListOfPendingTransactions()
    this.paymentDetailsService$.notificationCount.subscribe(count => this.pendingApprovalCount = count)
    this.userDetails = this.paymentDetailsService$.currentUser
    

  }
  getListOfPendingTransactions(){
    let count = 0
    this.paymentDetailsService$.getPaymentNotifications().subscribe(data =>{
      this.paymentDetails = data.query
      this.paymentDetails.forEach(payment =>{
        if(payment.status == 'pending' && payment.currentStatus == 'pending'){
          count ++;
        }
      });
      this.pendingApprovalCount = count

    })
  }
  setSwitch(value:string){
    this.choice = value
  }

}
