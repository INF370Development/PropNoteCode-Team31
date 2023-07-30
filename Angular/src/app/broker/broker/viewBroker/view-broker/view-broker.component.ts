import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrokerModelComponent } from "./broker-model/broker-model.component";
// import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { BrokercreatemodelComponent } from './brokercreatemodel/brokercreatemodel.component';


export interface user {
  userName: string;
  email: string;
  phone: number;
  amount: number;
  }
  

@Component({
  selector: 'app-view-broker',
  templateUrl: './view-broker.component.html',
  styleUrls: ['./view-broker.component.scss']
})
export class ViewBrokerComponent implements OnInit {


  name: string="";
  email: string="";
  
  columnsToDisplay: string[] = ["userName", "email","phone","amount","actions"];
  public USER_DATA: user[] = [
    { userName: "W1", email: "E1@gmail.com" ,phone:777777777, amount:1000},
    { userName: "W2", email: "E2@gmail.com" ,phone:888888888, amount:2000},
    { userName: "W3", email: "e3@gmail.com" ,phone:999999999, amount:11000}
  ];
  public newUser = {userName: "", email: "", phone:0, amount:0};
  public myDataArray: any;

  

  delete(row_obj:any){
    this.USER_DATA = this.USER_DATA.filter((value,key)=>{
      return value.email != row_obj.email;
    });
    this.myDataArray = [...this.USER_DATA];
  }


  constructor(public dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource<user>([...this.USER_DATA]);
  }
  //edit
  openDialog(row_obj:any): void {
    let dialogRef = this.dialog.open(BrokerModelComponent, {
      width: '250px',
      data: { name: this.name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if(this.name!=undefined){
        if(this.name==""){
         
        } else{
          row_obj.userName=this.name
          const newUsersArray = this.USER_DATA;
          this.myDataArray = [...newUsersArray];
          
        }
        
      }
            
      
    });
  }

  ngOnInit() {
  }

  openModal() {
    const dialogRef = this.dialog.open(BrokercreatemodelComponent, {
      
    })
  }
  
}


