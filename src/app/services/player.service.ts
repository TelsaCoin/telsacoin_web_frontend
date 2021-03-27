import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  public currentAudio;
  private currentModule: BehaviorSubject<object> = new BehaviorSubject<object>(null);
  constructor() { }

  public setCurrentModule(data) {
    console.log('setCurrentModule', data);
    this.currentAudio = data;
    this.currentModule.next(data);
  }

  public getCurrentModule(): Observable<object> {
    return this.currentModule.asObservable();
  }
}
