import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ApiService } from 'src/app/services/api.service';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  getProductsList = new Subscription();

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.get('product').subscribe((res) => {
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
        this.getProducts();
      }
    })
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getProducts();
      }
    })
  }

  deleteProduct(id: string){
    this.api.delete('product', id)
    .subscribe({
      next:(res)=>{
        alert("Product Delected Successfully")
        this.getProducts();
      },
      error:()=>{
        alert("Error while deleting the product")
      }
    })
  }

  ngOnDestroy() {
    this.getProductsList.unsubscribe();
  }

}
