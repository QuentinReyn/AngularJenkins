import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, public snackBar: MatSnackBar, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<UserFormComponent>, public userService: UserService) { }

  onAdd = new EventEmitter();
  isUpdate : boolean = false;
  //@ts-ignore
  userAddForm: FormGroup;

  ngOnInit() {
      if (this.user != null) {
        this.isUpdate = true;
          this.userAddForm = this._formBuilder.group({
              login: [this.user.Login, Validators.required],
              password: [this.user.Password, Validators.required],
              isAdmin: [this.user.IsAdmin,Validators.required],
              userID: [this.user.Id],
          });
      }
      else {
          this.userAddForm = this._formBuilder.group({
              login: ['', Validators.required],
              password: ['', Validators.required],
              isAdmin: ['', Validators.required],
              userID: [0],
          });
      }
}


  onNoClick(): void {
      this.dialogRef.close();
  }

  submitUser() {
    if(this.isUpdate){
      this.userService.updateUser(this.userAddForm);
       //@ts-ignore
      this.snackBar.open("✅ User successfully updated ✅", null, {
          duration: 3000,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
    else{
       this.userService.addUser(this.userAddForm);
      //@ts-ignore
     this.snackBar.open("✅ User successfully created✅", null, {
         duration: 3000,
     });
     this.dialogRef.close();
     this.onAdd.emit();

    }
  }
}
