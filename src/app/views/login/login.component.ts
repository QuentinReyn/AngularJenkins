import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService ,private route: ActivatedRoute, private router: Router, private _formBuilder: FormBuilder) { }

  //@ts-ignore
  loginForm: FormGroup
  invalidLogin: boolean = false;
  returnUrl: string = "";
  listUsers: User[]= []

  ngOnInit() {

    this.loginForm = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    // reset login status
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUsers(){
    this.userService.listUser().subscribe((data) => {
      //@ts-ignore
      this.listUsers = data.data;
      console.log(this.listUsers);
    });
  }

  login() {
    if(this.listUsers.find(m=>m.login == this.loginForm.value['login'] && this.listUsers.find(m=>m.password == this.loginForm.value['password']))){
      this.router.navigate([this.returnUrl]);
    }
  }
}
