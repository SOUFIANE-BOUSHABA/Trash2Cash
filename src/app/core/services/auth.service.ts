import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'users';
  private isLoggedInKey = 'isLoggedIn';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());

  constructor(private router: Router) {}

  private getUserFromLocalStorage(): User | null {
    return JSON.parse(localStorage.getItem(this.isLoggedInKey) || 'null');
  }

  register(user: User): void {
    const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const newUser = { ...user, id: `user-${users.length + 1}` };
    users.push(newUser);
    localStorage.setItem(this.userKey, JSON.stringify(users));
    localStorage.setItem(this.isLoggedInKey, JSON.stringify(newUser));

    this.currentUserSubject.next(newUser);
    this.router.navigate(['/login']);
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.userKey) || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(this.isLoggedInKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/profile']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  getUserId(): string {
    const user = this.getUserFromLocalStorage();
    return user?.id || '';
  }

  isAuth(): boolean {
    return localStorage.getItem(this.isLoggedInKey) !== null;
  }


  updateUser(updatedUser: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }


  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.isLoggedInKey);
      this.currentUserSubject.next(null);
      alert('Your account has been deleted.');
      this.router.navigate(['/register']);
    }
  }


}
