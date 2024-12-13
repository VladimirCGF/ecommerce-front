import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sideNavToggleSubject: Subject<void> = new Subject<void>();

  constructor() {}

  toggle(): void {
    this.sideNavToggleSubject.next();
  }
}
