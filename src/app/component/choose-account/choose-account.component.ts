import { Component, OnInit, Input,OnChanges, Output, EventEmitter } from '@angular/core';
import { PaymentDetailsService } from 'src/app/service/paymentDetails/payment-details.service';

@Component({
  selector: 'app-choose-account',
  templateUrl: './choose-account.component.html',
  styleUrls: ['./choose-account.component.css'],
})
export class ChooseAccountComponent implements OnInit, OnChanges {
  @Input() searchValue: any;
  @Output() result = new EventEmitter()
  searchVaalue = '';
  previousValue = 'DAta';
  nameSortData = 'ASC';
  dateSortData = 'DESC';
  commonField = true;
  commonColumn = 'entryTime';
  listOfPay = [];
  isNameSort = true;
  isTransactionSort = true;
  totalRows = 2;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 4, 8];
  dataSource = [];

  constructor(private paymentDetailsService$: PaymentDetailsService) {}

  ngOnInit(): void {
    // this.dataSource = this.paymentDetailsService$.accDetails
    this.recentPaymentList();

    setInterval(() => {
      if (this.previousValue != this.searchValue) {
        this.recentPaymentList();
      }
    }, 500);
  }

  ngOnChanges() {
    this.recentPaymentList();
  }

  recentPaymentList() {
    // if (this.searchValue != this.previousValue) {
    this.previousValue = this.searchValue;
    this.searchVaalue = this.searchValue;
    this.previousValue = this.searchVaalue;
    var offset = this.pageSize * this.currentPage;
    var accountDetails = {
      pageSize: this.pageSize,
      totalOffset: offset,
      sortItemBy: this.commonField ? this.commonColumn : this.commonColumn,
      sortBy: this.commonField ? this.dateSortData : this.nameSortData,
      searchItem: this.searchVaalue,
      accountNo: this.paymentDetailsService$.currentUser.accountNo
    };

    this.paymentDetailsService$
      .getSearchByAccountBySort(accountDetails)
      .subscribe((dat: any) => {
        // this.totalRows =Math.ceil(dat.TotalCount/this.pageSize);
        this.totalRows = dat.TotalCount;

        this.dataSource = dat.Data;
        this.listOfPay = dat.Data;
      });
    // }
  }

  nameSort() {
    this.isNameSort = !this.isNameSort;
    if (this.isNameSort) {
      this.nameSortData = 'ASC';
    } else {
      this.nameSortData = 'DESC';
    }
  }
  transactionSort() {
    this.isTransactionSort = !this.isTransactionSort;
    if (this.isTransactionSort) {
      this.dateSortData = 'DESC';
    } else {
      this.dateSortData = 'ASC';
    }
  }
  commmon(data: any) {

    // this.commonField = !this.commonField;
    if (data == 'datesort') {
      this.commonColumn = 'entryTime';
      this.commonField = true;
    } else {
      this.commonColumn = 'userName';
      this.commonField = false;
    }
    this.recentPaymentList();
  }

  changepage(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.recentPaymentList();
  }
  sentResponseToPay(account:any){
    this.result.emit(account)
  }
}
