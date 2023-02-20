import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MessageBoxComponent } from 'src/app/component/message-box/message-box.component';
import { PaymentDetails } from 'src/app/modules/paymentDetails';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;
  public isLoading =false;
  public paymentDetails!:PaymentDetails;
  public listOfPay:any;
  public formGroup!:FormGroup;
  public relativeData = true;
  public search="";
  public currentUser:any
  constructor(private _formBuilder: FormBuilder, private paymentDetailsService$: PaymentDetailsService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.currentUser =this.paymentDetailsService$.currentUser
    this.formGroup = this._formBuilder.group({
      pay:['', [Validators.required]],
      from:['',[Validators.required]],
      amount:['',[Validators.required]],
      paymentReason:['',[Validators.required]],
      currencyType:['',[Validators.required]]


    })
    this.paymentDetailsService$.copyObject.subscribe(data =>{
      this.formGroup.controls['paymentReason'].setValue(data.paymentReason)
      this.formGroup.controls['amount'].setValue(data.amount)
      this.formGroup.controls['from'].setValue(data.place)
      this.formGroup.controls['pay'].setValue(data.pay + '/' + data.IFSCcode)
      this.formGroup.controls['currencyType'].setValue(data.currencyType)
    })
  }
  payApiTrigger(value:any){
    let data ={
      searchItem: value,
      accountNo: this.paymentDetailsService$.currentUser.accountNo
    }
    console.log(data)
    if (value != ''){
      this.paymentDetailsService$.getSearchByAccount(data).subscribe(dat=>{
        this.listOfPay = dat.query
      })
    }
    this.listOfPay =[]
  }
  submitForm(){
    this.isLoading = true;
    let splitPay = (this.formGroup.controls['pay'].value).split('/');
    
    this.paymentDetails = {
      amount:this.formGroup.controls['amount'].value,
      currentUser: this.currentUser,
      pay: splitPay[0],
      IFSCcode: splitPay[1],
      paymentReason:this.formGroup.controls['paymentReason'].value,
      place:this.formGroup.controls['from'].value,
      status: 'pending',
      currencyType: this.formGroup.controls['currencyType'].value
    };
    this.paymentDetailsService$.payment.next(true);
    if(((this.paymentDetails.amount && this.paymentDetails.IFSCcode && this.paymentDetails.pay && this.paymentDetails.paymentReason && this.paymentDetails.place && this.paymentDetails.currencyType) !='')){
      
    this.paymentDetailsService$.makePayment(this.paymentDetails).subscribe(res =>{
      this.dialog.open(MessageBoxComponent,{data:{paymentDetails:this.paymentDetails,err: false},height:'500px',width:'550px'})
      this.formGroup.controls['paymentReason'].setValue('');
      this.formGroup.controls['amount'].setValue('');
      this.formGroup.controls['from'].setValue('');
      this.formGroup.controls['pay'].setValue('');
      this.formGroup.controls['currencyType'].setValue('')
      this.paymentDetailsService$.recentTransactionAPI.next(true);
      this.stepper.previous();
      this.isLoading = false;
    },
    err =>{
      console.log(err.error.message)
      let msg = err.error.message
      this.dialog.open(MessageBoxComponent,{data:{paymentDetails:msg,err: true},height:'500px',width:'550px'})
      this.formGroup.controls['paymentReason'].setValue('')
      this.formGroup.controls['amount'].setValue('')
      this.formGroup.controls['from'].setValue('')
      this.formGroup.controls['pay'].setValue('')
      this.formGroup.controls['currencyType'].setValue('')
      this.stepper.previous()
      this.isLoading =false
    }
    );
    }
    else{
      
      let msg = 'Invalid input'
    this.dialog.open(MessageBoxComponent,{data:{paymentDetails:msg,err: true},height:'500px',width:'550px'})
    this.formGroup.controls['paymentReason'].setValue('')
    this.formGroup.controls['amount'].setValue('')
    this.formGroup.controls['from'].setValue('')
    this.formGroup.controls['pay'].setValue('')
    this.formGroup.controls['currencyType'].setValue('')
    this.stepper.previous()
    this.isLoading =false
    }
    // else if(this.paymentDetailsService$.currentUser.profileData == 'maker' && ((this.paymentDetails.amount || this.paymentDetails.IFSCcode || this.paymentDetails.pay || this.paymentDetails.paymentReason || this.paymentDetails.place || this.paymentDetails.currencyType) =='')){
    //   let msg = 'Invalid input'
    //   this.dialog.open(MessageBoxComponent,{data:{paymentDetails:msg,err: true},height:'500px',width:'550px'})
    //   this.formGroup.controls['paymentReason'].setValue('')
    //   this.formGroup.controls['amount'].setValue('')
    //   this.formGroup.controls['from'].setValue('')
    //   this.formGroup.controls['pay'].setValue('')
    //   this.formGroup.controls['currencyType'].setValue('')
    //   this.stepper.previous()
    // }
    // else{
    //   let msg = 'Please login from Maker Account to make payments'
    //   this.dialog.open(MessageBoxComponent,{data:{paymentDetails:msg,err: true},height:'500px',width:'550px'})
    // }
    
    
  }
  
  
  
  searchChange(data:any){
   this.search=data.value
  }
  result(event:any){
    this.formGroup.controls['pay'].setValue(event.userName + '/' + event.IFSCcode)

  }
}
