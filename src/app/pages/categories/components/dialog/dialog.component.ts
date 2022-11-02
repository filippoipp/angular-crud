import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA }from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  categoryForm!: FormGroup;

  actionBtn: string ="Save";

  constructor(private formBuilder : FormBuilder, private api:ApiService, private dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name:['',Validators.required],
    });

    if(this.editData){
      this.actionBtn="Update";
      this.categoryForm.controls['name'].setValue(this.editData.name);
    }
  }



  addCategory(){
    if(!this.editData){
      if(this.categoryForm.valid){
        this.api.post('category', this.categoryForm.value)
        .subscribe({
          next:(res)=>{
            alert("Category added successfully");
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the category")
          }
        })
      }
    }else{
      this.updateCategory();
    }
  }

  updateCategory(){
    this.api.patch('category', this.categoryForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Category updated Successfully")
        this.categoryForm.reset();
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error while updating")
      }
    })
  }

}
