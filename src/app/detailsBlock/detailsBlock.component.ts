import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './detailsBlock.component.html',
  styleUrls: ['./detailsBlock.component.scss']
})
export class detailsBlockComponent {
  displayedColumns: string[] = ['no', 'name', 'ticket_number', 'ticket_topic','exam_grade', 'rating_grade', 'CGPA', 'comment'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<detailsBlockComponent>){
    const users = [{}];
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(){
    this.dataSource.data = [this.data];
  }
  closeDialog() {
    this.dialogRef.close('closed');
  }
}
