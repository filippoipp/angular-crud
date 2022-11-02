import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA }from '@angular/material/dialog'
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;

  actionBtn: string ="Save";

  categories: Category[];

  maskOptions = { prefix: '$ ', thousands: '.', decimal: ',' }

  constructor(private formBuilder : FormBuilder, private api:ApiService, private dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.getCategories();

    this.productForm = this.formBuilder.group({
      name:['',Validators.required],
      price:['',Validators.required],
      categoryId:['',Validators.required],
    });

    if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['categoryId'].setValue(this.editData.category.id);
    }
  }

  getCategories() {
    this.api.get('category').subscribe((res) => {
      this.categories = res
    });
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.post('product', this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.patch('product', this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Successfully")
        this.productForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error while updating")
      }
    })
  }

}
