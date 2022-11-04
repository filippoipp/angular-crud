import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;

  hide = true;

  constructor(private formBuilder : FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }

  login(){
    if(this.authForm.valid){
      this.api.post('auth', this.authForm.value)
      .subscribe({
        next:(res)=>{
          this.authForm.reset();
        },
        error:()=>{
          alert("Error to login")
        }
      })
    }
  }
}
