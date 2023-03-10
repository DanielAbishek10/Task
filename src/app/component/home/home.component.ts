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
    // let inputData = list;
    // if(!this.initData(inputData)) return;
    // this.buildDataSource()
    
  }
  displayedColumns: string[] = ['name', 'bank', 'latest', 'status', 'balance','balances', 'actions'];
  dataSource:any = new MatTableDataSource(list = this.paymentDetailsService$.list);
  datasource:any =[]
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Table | null;
 

  ngOnInit(): void {
    // this.dataSource.filterPredicate = function (record,filter) {
    //   return record.name.toLocaleLowerCase() == filter.toLocaleLowerCase();
    // }
    
    
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchbar') searchbar!:ElementRef;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState:Sort) {
    
    // if (sortState.active && sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    //   console.log(sortState);
    // }else if(sortState.direction){
    //   this._liveAnnouncer.announce(`Sorted ${sortState.active} && ${sortState.direction}ending`)
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }
  }
  verify(value:any){
    this.showTabel = value;

  }
  group(value:string){
    if(value == 'name'){
    list.sort((a,b) => a.name.localeCompare(b.name));
    this.dataSource.data = list
    }
    else if(value == 'bank'){
      list.sort((a,b) => a.bank.localeCompare(b.bank));
    this.dataSource.data = list
    }
    else if(value == 'status'){
      list.sort((a,b) => a.status.localeCompare(b.status));
    this.dataSource.data = list
    }
    
    // this.dataSource = new MatTableDataSource(this.dataSource.data.sort((a,b) => a.name.localeCompare(b.name)));
    // console.log(this.dataSource)
    


  }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
// }
applyFilter(event:any){
  let filter = event.target.value;
  this.dataSource.filter = filter.trim().toLowerCase();
}
// grouping the item by it's heading
// initData(data:any){
//   if(!data) return false;
//   this.displayedColumns = Object.keys(data[0]);
//   this.initialData = list;
//   return true;
// }

// /**
//  * Rebuilds the datasource after any change to the criterions
//  */
// buildDataSource(){
//   this.dataSource = this.groupBy(this.groupingColumn,this.initialData,this.reducedGroups);
// }

// /**
//  * Groups the @param data by distinct values of a @param column
//  * This adds group lines to the dataSource
//  * @param reducedGroups is used localy to keep track of the colapsed groups
//  */
// groupBy(column:string,data: any[],reducedGroups?: any[]){
//   if(!column) return data;
//   let collapsedGroups:any = reducedGroups;
//   if(!reducedGroups) collapsedGroups = [];
//   const customReducer = (accumulator:any, currentValue:any) => {
//     let currentGroup = currentValue[column];
//     if(!accumulator[currentGroup])
//     accumulator[currentGroup] = [{
//       groupName: `${column} ${currentValue[column]}`,
//       value: currentValue[column], 
//       isGroup: true,
//       reduced: collapsedGroups.some((group:any) => group.value == currentValue[column])
//     }];
    
//     accumulator[currentGroup].push(currentValue);

//     return accumulator;
//   }
//   let groups = data.reduce(customReducer,{});
//   let groupArray = Object.keys(groups).map(key => groups[key]);
//   let flatList = groupArray.reduce((a,c)=>{return a.concat(c); },[]);

//   return flatList.filter((rawLine:any) => {
//       return rawLine.isGroup || 
//       collapsedGroups.every((group:any) => rawLine[column]!=group.value);
//     });
// }

// /**
//  * Since groups are on the same level as the data, 
//  * this function is used by @input(matRowDefWhen)
//  */
// isGroup(index:any, item:any): boolean{
//   return item.isGroup;
// }

// /**
//  * Used in the view to collapse a group
//  * Effectively removing it from the displayed datasource
//  */
// reduceGroup(row:any){
//   row.reduced=!row.reduced;
//   if(row.reduced)
//     this.reducedGroups.push(row);
//   else
//     this.reducedGroups = this.reducedGroups.filter((el:any)=>el.value!=row.value);
  
//   this.buildDataSource();
// }

 
  isGroup(index:any,item:any):boolean{
    return item.isGroupBy;
  }
  transform(value:string){
    var name = groupBy(this.paymentDetailsService$.list,value);
    this.datasource =[]
    Object.keys(name).forEach(key =>{
      this.datasource.push({group: key, isGroupBy:true});
      let value = name[key];
      value.forEach((element:any) => {
        this.datasource.push(element)
      });
    });
    

    this.dataSource.data = this.datasource
  }
  showpopup(name:string,balance:number,value:boolean){
    
      // alert("Hi " + name + "!, Your balance is " + balance + " is Approved")
      this.paymentDetailsService$.name = name;
      this.paymentDetailsService$.balance = balance;
      this.paymentDetailsService$.value = value
      this.popup = true
      this.dialog.open(MessageBoxComponent);
  }
  
  
  
}
