import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { ConfirmationDialogComponent } from '../../shared/confirm/confirmation-dialog';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  title = 'Registered Users';
  users: User[] = [];
  isLoading = true;
  displayedColumns = ['username', 'email', 'role', 'action'];
  dataSource: any;
  hllCounter: number = 0;
  rolesCount: string = "";

  filterValues = {
    username: '',
    email: '',
    role: ''
  };
  usernameFilter = new FormControl('');
  emailFilter = new FormControl('');
  roleFilter = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getRolesCount();

    this.usernameFilter.valueChanges
      .subscribe(
        value => {
          this.filterValues.username = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.emailFilter.valueChanges
      .subscribe(
        value => {
          this.filterValues.email = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.roleFilter.valueChanges
      .subscribe(
        value => {
          this.filterValues.role = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      let flag = true;
      Object.keys(searchTerms).forEach(function(key) {
        if (searchTerms[key] !== '') {
          if (!data[key] || data[key].toString().indexOf(searchTerms[key]) === -1) {
            flag = false;
          }
        } 
      })
      return flag;
    }
    return filterFunction;
  }
  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
        this.getUsersDomainsCount();

      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getUsersDomainsCount(){
    this.userService.getUsersDomainsCount().subscribe(
      data => {
        console.log('getUsersDomainsCount --> ' + data)
        this.hllCounter = data
      },
      error => console.log(error)
    );
  }

  deleteUser(user: User) {
    var dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: false });
    dialogRef.componentInstance.title = "Delete User"
    dialogRef.componentInstance.message = 'Are you sure you want to delete ' + user.username + '?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user).subscribe(
          data => this.toast.open('user deleted successfully.', 'success'),
          error => this.toast.open('error deleting the user', 'danger'),
          () => this.getUsers()
        );
      }
    });
  }

  toggleAdmin(user: User) {
    let newRole = ""
    if (user.role=="user") {
      newRole = "admin"
    } else {
      newRole = "user"
    }
    var dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: false });
    dialogRef.componentInstance.title = "Change role"
    dialogRef.componentInstance.message = 'Change ' + user.username + ' role from "' + user.role + '" to "'+ newRole +'" ?'
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user.role = newRole
        this.userService.editUser(user).subscribe(
          res => this.toast.open('Role changed saved!', 'success'),
          error => this.toast.open('Error changing role', 'danger')
        );
      }
    });
  }

  getRolesCount(){
    console.log('getting roles count');
    this.userService.getRolesCount().subscribe(
      data => {
        this.rolesCount = data;
      },
      error => console.log(error)
    )
  }
}

