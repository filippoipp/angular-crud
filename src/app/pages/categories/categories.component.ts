import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  getCategoriesList = new Subscription();

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.api.get('category').subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
        this.getCategories();
      }
    })
  }

  editCategory(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getCategories();
      }
    })
  }

  deleteCategory(id: string){
    this.api.delete('category', id)
    .subscribe({
      next:(res)=>{
        alert("Category Delected Successfully")
        this.getCategories();
      },
      error:()=>{
        alert("Error while deleting the category")
      }
    })
  }

  ngOnDestroy() {
    this.getCategoriesList.unsubscribe();
  }

}
