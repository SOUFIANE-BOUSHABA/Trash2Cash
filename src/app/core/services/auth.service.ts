import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userKey = 'currentUser';
  private isLoggedInKey = 'isLoggedIn';
  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());

  constructor(private router: Router) {}



  private getUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }



  register(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    localStorage.setItem(this.isLoggedInKey, 'false');
    this.userSubject.next(user);
    this.router.navigate(['/login']);
  }



  login(email: string, password: string): boolean {
    const user = this.getUserFromLocalStorage();

    if (user && user.email === email && user.password === password) {
      this.userSubject.next(user);
      localStorage.setItem(this.isLoggedInKey, 'true');
      this.router.navigate(['/profile']);
      return true;
    }

    return false;
  }



  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }


  updateUser(updatedUser: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    this.userSubject.next(updatedUser);
  }


  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.isLoggedInKey);
      this.userSubject.next(null);
      alert('Your account has been deleted.');
      this.router.navigate(['/register']);
    }
  }

}
