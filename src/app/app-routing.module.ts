import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankLoanComponent } from './component/bank-loan/bank-loan.component';
import { CashAccountComponent } from './component/cash-account/cash-account.component';
import { CheckerPageComponent } from './component/checker-page/checker-page.component';
import { ChooseAccountComponent } from './component/choose-account/choose-account.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { PaymentFormComponent } from './component/payment-form/payment-form.component';
import { RecentPaymentComponent } from './component/recent-payment/recent-payment.component';
import { HomeComponent } from './component/home/home.component';
import { InverstmentComponent } from './component/inverstment/inverstment.component';
import { WebSocketComponent } from './component/web-socket/web-socket.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:"full"
  },
  {
    path:'payment',
    redirectTo:'/payment/(sidenav:recent)',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomePageComponent,
    children:[
      
      {
        path:'home',
        component: HomeComponent,
        outlet:'inner'
      },
      
      {
        path:'loan',
        component: BankLoanComponent,
        outlet:'inner'
      },
      {
        path:'cash',
        component: CashAccountComponent,
        outlet:'inner'
      },
      {
        path:'inverstment',
        component: InverstmentComponent,
        outlet:'inner'
      }
    ]
  },
  {
    path:'checker',
    component:CheckerPageComponent,
    
  },
  {
    path:'payment',
    component:PaymentFormComponent,
    children:[
      {
        path:'recent',
        component:RecentPaymentComponent,
        outlet:'sidenav'
      },
      {
        path:'chooseAccount',
        component:ChooseAccountComponent,
        outlet:'sidenav'
      }
    ]

  },
  {
    path:'socket',
    component:WebSocketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
