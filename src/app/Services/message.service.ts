import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class MessageService {
  private subjectMessage!: Subject<string>;
  //private behaviourSubject!: BehaviorSubject<string>;
  // we have ReplySubject also in rxjs 
  // for behaviour subject we can set initial value in constructor
  constructor() {
    this.subjectMessage = new Subject<string>();
    //this.behaviourSubject = new BehaviorSubject<string>('Hii from Message Service');
  }

  notifyMessage(message: string) {
    debugger
    // next is used to emit the message to all subscribers
    this.subjectMessage.next(message);
    setTimeout(() => {
      this.subjectMessage.next('');
    }, 2000);
  }

  getMessage(): Subject<string> {
    return this.subjectMessage;
  }
}
