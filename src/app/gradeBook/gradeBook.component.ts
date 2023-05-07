import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { detailsBlockComponent } from '../detailsBlock/detailsBlock.component';

@Component({
  selector: 'app-grade-book',
  templateUrl: './gradeBook.component.html',
  styleUrls: ['./gradeBook.component.scss'],
  providers: [
    { provide: MatFormFieldControl , useExisting: MatFormFieldControl}   
  ]
})

// This is a TypeScript class that implements the AfterViewInit interface
export class GradeBookComponent implements AfterViewInit{
  // Define the columns of the table to be displayed
  displayedColumns: string[] = ['no', 'name', 'ticket_number', 'rating_grade',  'exam_grade', 'final_grade', 'status', 'details'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Define some variables that will be used to store and manipulate data
  studentData:any[] =[];
  selectedRowIndex: number = -1;
  filtered_student:any[] =[];
  student_data:any[] = [];
  average_grade:number = 0;
  maximal_grade: number = 0;
  minimal_grade: number = 0;
  total_student: number = 0;
  is_statistics: boolean = false;
  count_student_by_grade: number =0;
  grade_count_opt:number[] =[];

  // Inject HttpClient and MatDialog in the constructor
  constructor(private http: HttpClient, public dialog: MatDialog) {
    const users = [{}];
    this.dataSource = new MatTableDataSource(users);
  }

  // ngOnInit is called after the component is initialized
  ngOnInit(){
    this.getStudentData();
    for (let index = 1; index <= 10; index++) {
      this.grade_count_opt.push(index);
    }
  }

  // This function uses HttpClient to get student data from a JSON file
  getStudentData(){
    return this.http.get('assets/student_data.json').subscribe((data:any)=>{
      this.studentData = data;
      this.studentData.map(student =>{
        const final_grade = 0.6 * student.exam_grade + 0.4 * student.rating_grade;
        student.final_grade = final_grade.toFixed(2);
        student.status = student.final_grade > 4 ? "Passed" : "Failed";
        student.comment = student.final_grade > 4 ? "Impressive" : "Unsatisfactory";
        this.student_data.push(student);
      })
      this.dataSource.data = this.student_data;
      this.dataSource.sort = this.sort;
    });
  }

  //This function is called after the view has been initialized
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //filters students by their status
  filterStudentsByOption(event:any){
    const status = event.source.value;
    if(event.isUserInput){
    if(status === "All"){
      this.filtered_student = this.student_data;
    } else {
      this.filtered_student = this.studentData.filter(student => student.status === status);
    }
    this.dataSource.data = this.filtered_student;
    this.calculateAverageGrade();
  }
  }

  //selects the option by grade
  selectOptionByGrade(event: any){
    const grade = event.source.value;
    if(event.isUserInput){
    this.count_student_by_grade =  this.filtered_student.filter(student => student.exam_grade === grade).length
    }
  }

  //user types in the filter input field
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //when the user clicks on the "Show statistics" button
  onStatisticsChange(event:any){
    if(event.value === "Show statistics"){
      this.is_statistics = true;
    } else {
      this.is_statistics = false;
    }
  }

  //calculates the average, maximal, and minimal grades
  calculateAverageGrade() {
    this.filtered_student = this.filtered_student ? this.filtered_student : this.student_data;
    let ave = 0;
    this.filtered_student.map((student)=> {
      ave += student.exam_grade;
    });
    this.average_grade =  +(ave/ this.filtered_student.length).toFixed(2);
    this.maximal_grade =  Math.max(...this.filtered_student.map(student => student.exam_grade));
    this.minimal_grade =  Math.min(...this.filtered_student.map(student => student.exam_grade));
    this.total_student =  this.filtered_student.length;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data:any): void {
  const dialogRef =  this.dialog.open(detailsBlockComponent, {
      data: data,
    });
    dialogRef.componentInstance.dialogRef = dialogRef;
  }
  onRowClick(row:any){
    this.selectedRowIndex = row.no;
  }
}


