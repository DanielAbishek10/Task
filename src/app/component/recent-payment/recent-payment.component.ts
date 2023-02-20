import { Component, OnInit } from '@angular/core';
import { PaymentDetails } from 'src/app/modules/paymentDetails';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-recent-payment',
  templateUrl: './recent-payment.component.html',
  styleUrls: ['./recent-payment.component.css']
})
export class RecentPaymentComponent implements OnInit {

  constructor(private paymentDetailsService$: PaymentDetailsService) { }
  public isLoading = true;
  public dataSource:any
  ngOnInit(): void {
    this.paymentDetailsService$.recentTransactionAPI.subscribe(value =>{
      if(value){
        this.getRecentTransaction()
      }
    })
    this.getRecentTransaction()
    // this.dataSource = this.paymentService.recentPayment
    
  }
  getRecentTransaction(){

    this.paymentDetailsService$.getRecentTransaction().subscribe(recentPayment =>{
      let date = new Date()
      let currentDate = date.getDate()
      let currentMonth = date.getMonth()
      let currentYear = date.getFullYear()
      let currentDateFormat = currentDate + '/' + currentMonth + '/'+ currentYear
      recentPayment.forEach((payment:PaymentDetails) => {
        let reportTime = new Date(payment.entryTime);
        let reportDate = reportTime.getDate();
        let reportMonth = reportTime.getMonth();
        let reportYear = reportTime.getFullYear()
        
        let reportDateFormat = reportDate + '/' + reportMonth + '/'+ reportYear
        if(currentDateFormat == reportDateFormat){
          let reportHour = reportTime.getHours()
          let reportMin = reportTime.getMinutes()
          let reportSec = reportTime.getSeconds()
          payment.entryTime =  'Today ' + reportHour + ':' + reportMin + ':' + reportSec
        }
        else{
          payment.entryTime = reportDateFormat
        }
      });
      this.dataSource = recentPayment
      this.isLoading = false
    })
  }
  copyContent(detail:any){
    this.paymentDetailsService$.copyObject.next(detail);
  }

}
