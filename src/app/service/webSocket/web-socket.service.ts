import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket!: WebSocket
  constructor() { }
  
  public createWebSocket(url:string):Observable<any>{

    this.webSocket = new WebSocket(url)
    console.log(this.webSocket.OPEN,this.webSocket.CLOSED,this.webSocket.CONNECTING)
    if (this.webSocket.readyState == this.webSocket.OPEN){
      console.log('Open')
    }
    else{
      console.log('Open?')
    }
    if (this.webSocket.readyState == this.webSocket.CLOSED){
      console.log('Close')
    }
    else{
      console.log('Close?')
    }
    if (this.webSocket.readyState == this.webSocket.CLOSING){
      console.log('Closing')
    }else{
      console.log('Closing?')
    }
    if (this.webSocket.readyState == this.webSocket.CONNECTING){
      
      console.log(this.webSocket.url)
    }
    else{
      console.log('Connection ?')

    }
    return new Observable(observer =>{
      this.webSocket.onopen = ()=> console.log("opened")
      this.webSocket.onmessage = (event) => observer.next(event.data);
      this.webSocket.onerror = (event) => observer.error(event);
      this.webSocket.onclose = () => observer.complete();
    })
  }
  public sendMessage(message:any){
    this.webSocket.send(JSON.stringify(message))
  }
}
