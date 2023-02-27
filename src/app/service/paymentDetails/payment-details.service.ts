import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Table } from '../../table';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  public notificationCount = new Subject<any>()
  public copyObject = new Subject<any>()
  public recentTransactionAPI = new Subject<any>()
  public isLogin = new BehaviorSubject<boolean>(false)
  public verificationDetail = new Subject<any>()
  public payDetails = new Subject<any>()
  public sub = new Subject<Table>()
  public currentUser:any
  public payment = new BehaviorSubject<boolean>(false)
  name:string = '';
  balance:number = 0;
  value: boolean = false;
  private url = environment.apiUrl;
  // private pythonUrl = environment.apiUrlFast
  private pythonUrl='http://192.168.3.123:3500/api'
  header = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8').append('Authorization', 'Bearer')
  accDetails:any = [
{AccountName: 'SavingsAccount', UserName: 'Reuban', AccountNo: '90f15fba-ca2b-4174-b12d-ee93e60c8a59'},
{AccountName: 'MalabarAccount', UserName: 'vibin', AccountNo: 'c68a50b3-7bcb-4bf9-aaff-2dbb5ca06da9'},
{AccountName: 'SavingsAccount', UserName: 'Abishek', AccountNo: 'd21777cf-8959-4e78-90da-05fd8c1705a0'},
{AccountName: 'SavingsAccount', UserName: 'Daniel', AccountNo: 'e2e8f114-6e90-4aa7-910d-e80e1bb9d877'}
  ]
  list:Table[] =[
    // {name: 'Abii',bank:'UHB', status:'active', latest:'', balance:0.00, balances:0.00 },
    // {name: 'Durai',bank:'THB', status:'active', latest:'', balance:0.00, balances:0.00 },
    // {name: 'Bala',bank:'UHB', status:'inactive', latest:'', balance:0.00, balances:0.00 },
    // {name: 'Chandru',bank:'THB', status:'active', latest:'', balance:0.00, balances:0.00 },
    // {name: 'Elango',bank:'UHB', status:'inactive', latest:'', balance:0.00, balances:0.00 }
  ]
  constructor(private http:HttpClient) {

   }
   public getRecentTransaction():Observable<any>{
      return this.http.get(this.url+'recentList')
   }
   public getSearchByAccount(searchKey:any):Observable<any>{
    return this.http.get(this.url + 'intelletUsers',{params:searchKey} )
   }
   public makePayment(details:any):Observable<any>{
    return this.http.post(this.url + 'UserDetailsRegistration',details)
   }
   public login(details:any):Observable<any>{
    return this.http.post(this.url+'login',details)
   }
   public getListOfPendingPaymentDetails():Observable<any>{
    return this.http.get(this.url + 'statusData')
   }
   public updateStatus(status:any):Observable<any>{
    return this.http.put(this.url + 'statusUpdate',status)
   }
   public getSearchByAccountBySort(details:any):Observable<any>{
    return this.http.get(this.url + 'orderchanges', {params:details})
   }
   public getPaymentNotifications():Observable<any>{
    let userAccount ={accountNo:this.currentUser.accountNo}
    return this.http.get(this.url + 'traceGet', {params:userAccount})
   }
   public setTraceForPaymentNotifications(details:any):Observable<any>{
    return this.http.post(this.url + 'traceInsert',details)
   }
   public getPaymentDetails(params: any):Observable<any>{
    return this.http.get(this.pythonUrl + '/groupBy', {params:params})
   }
   public getSortedValue(params: any):Observable<any>{
    return this.http.get(this.pythonUrl + '/sortData', {params:params}) 
   }
}
