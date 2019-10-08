import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocektService {

  private socekt: any;
  readonly url: string = 'https://ship-server-rp.herokuapp.com';

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

  get Me() {
    return new Promise((resolve, reject) => {
      this.listen('me').subscribe(me => resolve(me))
    })
  }


  get socket$() {
    this.listen('keys-share').subscribe(res => console.log(res, 'res'))
    return this.listen('key-share')
  }


}
