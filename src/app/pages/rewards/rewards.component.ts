import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rewards',
  standalone: true,
  templateUrl: './rewards.component.html',
  imports: [
    DatePipe
  ],
})
export class RewardsComponent implements OnInit {
  user: any;
  transactions: any[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  }

  convertPoints(points: number, amount: number): void {
    if (this.user.points >= points) {
      this.user.points -= points;
      this.transactions.push({ points, amount, date: new Date() });
      localStorage.setItem('isLoggedIn', JSON.stringify(this.user));
      localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
  }
}
