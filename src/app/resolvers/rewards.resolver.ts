import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RewardsResolver implements Resolve<any> {
  resolve(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    return of({ user, transactions });
  }
}
