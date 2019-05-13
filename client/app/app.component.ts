import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public auth: AuthService,
    private chatService: ChatService
    ) {
    chatService.messages.subscribe(data => {
      
    });
  }
}
