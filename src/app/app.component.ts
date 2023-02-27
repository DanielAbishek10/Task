import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PaymentDetailsService } from './service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLoading = false
  formGroup!:FormGroup
  constructor(private _formBuilder:FormBuilder, private paymentDetailsService$:PaymentDetailsService, private router:Router,private _snackBar:MatSnackBar){}
  ngOnInit(): void {
    // this.paymentDetailsService$.getGroupedValues('pay').subscribe(data => console.log(data))
    this.paymentDetailsService$.currentUser = {userName:'tester',profileData:'checker'}
    this.formGroup = this._formBuilder.group({
      name:[''],
      password:['']
    })
  }
 
  list:any ={};
  login = false;
  title = 'Task';
  message(){
    this.isLoading =true
    this.router.navigate(['/home'])
    if(this.formGroup.controls['name'].value == "" || this.formGroup.controls['password'].value == ""){
      alert("You not entered the Username or Password try again");
    }
    else if(this.formGroup.controls['password'].value.length<4) {
      alert("password should contain atleast four element")
    }
    else{
      let loginDetails = {
        userName:this.formGroup.controls['name'].value,
        password:this.formGroup.controls['password'].value
      }
    this.paymentDetailsService$.login(loginDetails).subscribe(res => {
      this.login = res.access
      this.paymentDetailsService$.currentUser = res.data[0]
      this._snackBar.open('Successfully LoggedIn','',{
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:1000,
        panelClass:['success']
      });
      this.isLoading =false;
    },
    err => {
      this._snackBar.open('UserName/Password Invalid','',{
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration:5000,
        panelClass:['warning']
      });
      this.isLoading =false;

    })
    }
  }
}
