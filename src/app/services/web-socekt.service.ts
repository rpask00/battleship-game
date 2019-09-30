import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocektService {

  socekt: any;
  readonly url: string = 'http://localhost:3000/';

  constructor() {
    this.socekt = io(this.url)
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socekt.on(eventName, data => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socekt.emit(eventName, data);
  }


}
