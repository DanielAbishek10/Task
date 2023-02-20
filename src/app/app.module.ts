import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MessageBoxComponent} from './component/message-box/message-box.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { MaterialModule } from './component/material/material.module';
import { CashAccountComponent } from './component/cash-account/cash-account.component';
import { InverstmentComponent } from './component/inverstment/inverstment.component';
import { BankLoanComponent } from './component/bank-loan/bank-loan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PaymentFormComponent } from './component/payment-form/payment-form.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { RecentPaymentComponent } from './component/recent-payment/recent-payment.component';
import { ChooseAccountComponent } from './component/choose-account/choose-account.component';
import { IndexPageComponent } from './component/index-page/index-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CheckerPageComponent } from './component/checker-page/checker-page.component';
import { CheckerListComponent } from './component/checker-list/checker-list.component';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';
import { WebSocketComponent } from './component/web-socket/web-socket.component';


@NgModule({
  declarations: [
    
    AppComponent,
    HomeComponent,
    CashAccountComponent,
    InverstmentComponent,
    BankLoanComponent,
    FilterPipe,
    PaymentFormComponent,
    HomePageComponent,
    RecentPaymentComponent,
    ChooseAccountComponent,
    IndexPageComponent,
    CheckerPageComponent,
    CheckerListComponent,
    MessageBoxComponent,
    NumbersOnlyDirective,
    WebSocketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
