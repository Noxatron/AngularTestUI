import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket: WebSocket;
  private messageSubject: Subject<string> = new Subject();

  public onMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  constructor() {
    this.webSocket = new WebSocket('wss://localhost:7285/ws');
    this.connect();
  }

  private connect(): void {

    this.webSocket.onopen = (event) => {
      console.log('WebSocket connection established:', event);
    };

    this.webSocket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.webSocket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.webSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  }

  public sendMessage(message: string): void {
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(message);
    }
  }

  public close(): void {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }
}
