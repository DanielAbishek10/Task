import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MatTableDataSource } from "@angular/material/table";
import { Table } from '../../table';
import { PaymentDetailsService } from '../../service/paymentDetails/payment-details.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../component/message-box/message-box.component';
// import { groupBy } from 'rxjs';

let list:Table[]=[]
const groupBy:any = (data:any, key:any)=>{
  return data.reduce((x:any, y:any) => {
    (x[y[key]] = x[y[key]]||[]).push(y);
    return x;
  },{});
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  
  
  panelOpenState = false;
  groupingColumn:any;
  showTabel =true
  reducedGroups:any = [];
  initialData!:any[];
  popup = false;
  public searchValue:string ='';
  constructor(private paymentDetailsService$: PaymentDetailsService, private _liveAnnouncer: LiveAnnouncer, private dialog:MatDialog) { 
    
  }
  displayedColumns: string[] = ['amount', 'from', 'to', 'ifsc', 'status'];
  groupByColumns: string = ['From', 'To', 'IFSC', 'Status']
  temp: string[] = ['From', 'To', 'IFSC', 'Status']
  dataSource:any = new MatTableDataSource();
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchbar') searchbar!:ElementRef;
 

  ngOnInit(): void {
    this.groupByColumns = this.groupByColumns;
    let params = {
      user: this.paymentDetailsService$.accDetails.accountNo;
    }
    this.paymentDetailsService$.getTableValues(params).subscribe(colummns => {
      this.dataSource = colummns.data;
    }) 
  } 
  
  transform(value): void{
    this.groupByColumns = this.temp.filter((item: any) => item !== value);

    let params = {
      user: this.paymentDetailsService$.accDetails.accountNo;
      groupByOne: value
    }


    this.paymentDetailsService$.getTableValues(params).subscribe(colummns => {
      this.dataSource = colummns.data;
    })

  }

  getSortedData(event: any){
    let params = {

    }
    
  }

}
