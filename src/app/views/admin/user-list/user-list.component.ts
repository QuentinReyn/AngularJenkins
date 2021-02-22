import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, public snackBar: MatSnackBar, public dialog: MatDialog, private _router: Router) { }

  isLoadingResults = false;
  totalUsers = 0;
  isMeOnly = false;
  columnsToDisplay = ["id", "login","password","isAdmin", "actions"];
  users = new MatTableDataSource();
  listUsers: User[] = [];

  getUsers(): void {
      this.userService.listUser().subscribe(
          data => {
            //@ts-ignore
              this.users.data = data.data as User[];
          }
      );
  }

  ngOnInit() {
      // If the user changes the sort order, reset back to the first page.
      this.getUsers();
  }

  deleteUserById(user_id : any) {
      var ans = confirm("Do you want to delete this user ?");
      if (ans) {
          this.userService.deleteUserById(user_id).subscribe(success => {
              this.getUsers();
              //@ts-ignore
              this.snackBar.open("✅ User successfully deleted ✅", null, {
                  duration: 3000,
              });
          })
      }
  }

  openUserModalAdd() {
      let dialogRef = this.dialog.open(UserFormComponent, {
          width: '600px',
          height: '400px'
      });
      dialogRef.afterClosed().subscribe(() => {
          this.getUsers();
      })
  }

  openUserModalEdit(user : any) {
      let dialogRef = this.dialog.open(UserFormComponent, {
          data: user,
          width: '600px',
      });
      dialogRef.afterClosed().subscribe(() => {
          this.getUsers();
      })
  }
}
