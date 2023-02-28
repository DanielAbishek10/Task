import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { MatTableDataSource } from "@angular/material/table";
import { Table } from '../../table';
import { PaymentDetailsService } from '../../service/paymentDetails/payment-details.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../component/message-box/message-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
// import { groupBy } from 'rxjs';

let list:Table[]=[]
const groupBy:any = (data:any, key:any)=>{
  return data.reduce((x:any, y:any) => {
    (x[y[key]] = x[y[key]]||[]).push(y);
    return x;
  },{});
};
interface MyObject {
  [key: string]: any;
  // other properties...
}
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
  @ Input() groupingColumn!: any;
  @ Input() groupingColumnType!: any;
  showTabel =true
  reducedGroups:any = [];
  initialData!:any[];
  popup = false;
  public searchValue:string ='';
  constructor(private paymentDetailsService$: PaymentDetailsService, private _liveAnnouncer: LiveAnnouncer, private dialog:MatDialog) { 
    
  }
  public parameterData: any = []
  public groupValue: string = ''
  public groupValueType: string = ''
  public myObj: MyObject = {'Bank': 'IFSCcode', 'From': 'place', 'Currency Type': 'currencyType', 'To': 'pay', 'Entry Time':'entryTime', 'Status':'status'}
  displayedColumns: string[] = ['amount', 'place', 'pay', 'IFSCcode', 'status'];
  groupByColumns: any = ['From', 'To', 'Bank', 'Status', 'Currency Type', 'Entry Time']
  groupByColumnsType: any = []
  temp: string[] = ['From', 'To', 'Bank', 'Status', 'Currency Type', 'Entry Time']
  
  // dataSource:any = new MatTableDataSource();
  dataSource:any = []
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  public pageEvent!: PageEvent;
  public pageIndex: number = 0;
  public pageSize: number = 2;
  public length!: number;
  public columnName!: string;
  public sorting!: string;
  public isSorted!: boolean;

  @Input() cardName$!: string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchbar') searchbar!:ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.pageIndex = 0
    this.groupByColumns = ['From', 'To', 'Bank', 'Status', 'Currency Type', 'Entry Time'];
    this.groupByColumnsType = []
    let param: { 
      user?: any; 
      cardName?: any; 
      page_no?: any; 
      no_of_data?: any;
    }
    param = {
      user: this.paymentDetailsService$.currentUser.accountNo
    }

    this.paymentDetailsService$.getTableValues(param).subscribe(colummns => {
      this.dataSource = colummns.data;
      this.length = colummns.data[0].count
      this.dataSource.paginator = this.paginator
      console.log(this.paginator)
      
      param.cardName = 'all'
      param.no_of_data = this.pageSize
      param.page_no = this.pageIndex * this.pageSize
      this.paymentDetailsService$.getPaginatedValues(param).subscribe(columns => {
        this.dataSource[0].record = columns.record
      })
    }) 

    

  } 
  
  transform(value: any): void{
    this.groupValue = value
    this.groupValueType = ''
    this.parameterData = []
    this.parameterData.push(value)
    this.groupByColumns = this.temp.filter((item: any) => item !== value);
    this.groupByColumnsType = this.temp.filter((item: any) => item !== value);

    let param = {
      user: this.paymentDetailsService$.currentUser.accountNo,
      groupByOne: this.myObj[value]
    }

    this.paymentDetailsService$.getTableValues(param).subscribe(columns => {
      this.dataSource = columns.data
      console.log(this.dataSource)
    })
  }

  transformGroup(value: any){
    this.groupValueType = value
    if (this.parameterData.length <= 1){
      this.parameterData.push(value);
    }else {
      this.parameterData.pop()
      this.parameterData.push(value)
    }

    let param: { user: any; groupByOne: any; groupByTwo?: any; };

    if (this.parameterData.length === 1) {
      param = {
        user: this.paymentDetailsService$.currentUser.accountNo, 
        groupByOne: this.myObj[value] 
      };
      this.groupByColumns = this.temp.filter((item: any) => item !== value);
      this.groupByColumnsType = this.temp.filter((item: any) => item !== value);
    } else {
      param = { 
        user: this.paymentDetailsService$.currentUser.accountNo,
        groupByOne: this.myObj[this.parameterData[0]],
        groupByTwo: this.myObj[this.parameterData[1]]
      };
      this.temp = this.temp.filter((item: any) => item !== this.parameterData[0]);
      this.groupByColumns = this.temp.filter((item: any) => item !== this.parameterData[1]);
      this.temp = this.temp.filter((item: any) => item !== this.parameterData[0]);
      this.groupByColumnsType = this.temp.filter((item: any) => item !== this.parameterData[1]);
    }

    this.paymentDetailsService$.getTableValues(param).subscribe(columns => {
      this.dataSource = columns.data
      console.log(this.dataSource)

    })

  }

  getSortedData(event: any): any{
    let params = {

    }
    console.log(event)
  }

  handlePageEvent(e: any, cardName: any) {
    this.pageIndex = 0
    if (Object.keys(e).length == 2){
      this.columnName = e.active
      this.sorting = e.direction
    }else{
      this.pageEvent = e;
      this.length = e.length;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
    }

    let param: { 
      user: any; 
      cardName: any; 
      page_no: any; 
      no_of_data: any; 
      column_one?: any; 
      column_two?: any;
      column?: any;
      is_sorted?: any;
    };

    param = {
      user: this.paymentDetailsService$.currentUser.accountNo,
      cardName: cardName,
      page_no: this.pageIndex * this.pageSize,
      no_of_data: this.pageSize
    }
    
    for (let i = 0; i < this.parameterData.length; i++){
      if (i == 0){
        param.column_one = this.myObj[this.parameterData[i]]
      }
      if (i == 1){
        param.column_two = this.myObj[this.parameterData[i]]
      }
    }

    if (this.sorting == 'asc'){
      this.isSorted = false
    }else if (this.sorting == 'desc'){
      this.isSorted = true
    }
    
    if (this.sorting && this.columnName){
      param.is_sorted = this.isSorted
      param.column = this.columnName
    }

    this.paymentDetailsService$.getPaginatedValues(param).subscribe(columns => {
      // this.dataSource[0].record = columns.record
      for(let i = 0; i < this.dataSource.length; i++){
        if (this.dataSource[i].name == cardName){
          this.dataSource[i].record = columns.record
        }
      }
      console.log(this.dataSource[0])
    })

  }

  ngAfterViewInit(){
    console.log('Hey')
  }

  onPanelOpened(cardName: string){
    this.pageIndex = 0
    let param: { 
      user?: any; 
      cardName?: any; 
      page_no?: any; 
      no_of_data?: any;
      column?: any;
      column_one?: any;
      column_two?: any;
    }
    param = {
      user: this.paymentDetailsService$.currentUser.accountNo,
      cardName: cardName,
      page_no: this.pageIndex * this.pageSize,
      no_of_data: this.pageSize
    }

    for(let i = 0; i < this.parameterData.length; i++){
      if (i == 0){
        param.column_one = this.myObj[this.parameterData[i]]
      }
      if (i == 1){
        param.column_two = this.myObj[this.parameterData[i]]
      }
    }

    this.paymentDetailsService$.getPaginatedValues(param).subscribe(columns => {
      for(let i = 0; i < this.dataSource.length; i++){
        if (this.dataSource[i].name == cardName){
          this.dataSource[i].record = columns.record
        }
      }
      console.log(this.dataSource[0])
    })
  }
}
