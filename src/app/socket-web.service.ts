import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
//import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

outEven: EventEmitter<any> = new EventEmitter();
callback: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) { 
    super({
      url: 'http://localhost:5000',
      options: {
        query: {
          nameRoom: cookieService.get('room')
        }
      }
    })
    this.listen()
  }

  listen = ()=>{
    this.ioSocket.on('evento', res=> this.callback.emit(res))
  }

  emitEvent = (payload ={}) => {
    this.ioSocket.emit('evento',payload);
  }
}
