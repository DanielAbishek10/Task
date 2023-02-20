import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetails } from 'src/app/modules/paymentDetails';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-checker-list',
  templateUrl: './checker-list.component.html',
  styleUrls: ['./checker-list.component.css']
})
export class CheckerListComponent implements OnInit {
  public isLoading =false;
  @Input() paymentDetails!: PaymentDetails[];
  public isChecker = false;
  public paymentDetail:any;
  public agoTime:any
  constructor(private paymentDetailsService$:PaymentDetailsService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.paymentDetailsService$.currentUser.profileData == 'checker'){
      this.isChecker = true;
    }
    this.getListOfPendingTransactions()
    
  }
  getListOfPendingTransactions(){
    
    let count = 0
    this.paymentDetailsService$.getPaymentNotifications().subscribe(data =>{
      this.paymentDetails = data.query
      console.log(this.paymentDetails)
      this.paymentDetails.forEach(payment =>{
        payment.entryTime = this.getAgoTime(new Date(payment.entryTime));
        
        if(payment.status == 'pending' && payment.currentStatus == 'pending'){
          count ++;
        }
      });
      this.paymentDetailsService$.notificationCount.next(count)
      this.isLoading =false
    })
  }
  
  approvalRequest(value:any){
    this.router.navigate(['/checker'])
    this.paymentDetailsService$.verificationDetail.next(value)
  }
  updateStatus(id:any,status:string){
    this.isLoading =true
    let query = {
      ID: id.ID,
      statusCode:status,
      currentUser:this.paymentDetailsService$.currentUser
    }
    console.log(id)
    // if(this.isChecker){

      this.paymentDetailsService$.updateStatus(query).subscribe(res => this.insertUpdateToTrace(query))
    // }
    // else{
    //   alert('Please login as a checker')
    //   console.log('wrong')
    // }
  }
  insertUpdateToTrace(query:any){
    
    this.paymentDetailsService$.setTraceForPaymentNotifications(query).subscribe(res => this.getListOfPendingTransactions())

  }
  getAgoTime(date: Date) {
    const currentDate = new Date();
    const seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
  
    this.agoTime = this.datePipe.transform(date, '', '', '');
  
    if (seconds < 60) {
      this.agoTime = 'less than a minute ago';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      this.agoTime = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      this.agoTime = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      this.agoTime = `${days} day${days > 1 ? 's' : ''} ago`;
    }
    return this.agoTime;
  }
  

}
