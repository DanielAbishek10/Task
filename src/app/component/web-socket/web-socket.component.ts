import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/service/webSocket/web-socket.service';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.css']
})
export class WebSocketComponent implements OnInit {

  constructor(private webSocketService$: WebSocketService) { }

  ngOnInit(): void {
    this.tiggerWebSocket()
  }
  public tiggerWebSocket(){
    this.webSocketService$.createWebSocket('wss://echo.websocket.org/').subscribe(message => {
      console.log(message)
    },
    err =>{
      console.log(err)
    })
  }

  public sendMessage(value:any){
    this.webSocketService$.sendMessage(value);
  }

}
