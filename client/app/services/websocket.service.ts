import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class WebsocketService {
  constructor(public auth: AuthService) { }

  private subject: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    } 
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    // send inital token for any connection
    let token = this.auth.getToken();
    ws.onopen = function() {
      if (token) {
        let message = {
          type: 'login',
          message: token
        }
        ws.send(JSON.stringify(message));
      }
    };

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<MessageEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(data));
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}