import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {


  private socketUrl = environment.socketUrl;
  private socket!: Socket
  constructor() { }
  // public connectSocket(){
  //   this.socket = io(this.socketUrl);
  //   this.socket.on('message', (data: any)=>{
  //     this.receivedData.push(data);
  //     console.log(this.receivedData)
  //   })
  // }
}
