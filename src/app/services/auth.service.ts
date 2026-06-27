import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);



  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUserId(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.uid : null;
  }

  login() {
    this.currentUserSubject.next({
      uid: 'matija123',
      firstName: 'Matija',
      lastName: 'Veljković',
      username: 'matija123',
      email: 'matija@example.com',
    });
    console.log('User logged in');
  }

  logout() {
    this.currentUserSubject.next(null);
    console.log('User logged out');
  }
}
