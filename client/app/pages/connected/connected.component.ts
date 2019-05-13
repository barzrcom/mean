import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ChatService, WsUser } from '../../services/chat.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})

export class ConnectedComponent implements OnInit {

  title = 'Connected Users';
  isLoading = true;
  displayedColumns = ['icon', 'username', 'email', 'role', 'action'];
  dataSource: any;
  users: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    public toast: ToastComponent,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.getConnectedList();
    this.isLoading = false;
  }
  
  getConnectedList(){
    this.chatService.messages.next({
      type: 'list',
      message: ""
    });
    this.chatService.messages.subscribe(data => {	
      switch(data.type) { 
        case "list": {
          this.users = data.message;
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          break; 
        } 
        default: {  
          break; 
        } 
      } 
    });
  }

  ping(user) {
    this.chatService.messages.next({
      type: 'ping',
      message: user.email
    });
  }
}

