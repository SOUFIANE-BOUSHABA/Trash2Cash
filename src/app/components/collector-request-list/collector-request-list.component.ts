// src/components/collector-request-list/collector-request-list.component.ts
import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgForOf, NgIf } from "@angular/common";
import { Observable } from "rxjs";
import { Request } from "../../core/models/request.model";
import { Store } from "@ngrx/store";
import { selectPendingRequests } from "../../state/requests/requests.selectors";
import * as RequestActions from "../../state/requests/requests.actions";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-collector-request-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './collector-request-list.component.html'
})
export class CollectorRequestListComponent {
  requests$: Observable<Request[]>;
  userAddress: string;

  constructor(private store: Store, private authService: AuthService) {
    this.requests$ = this.store.select(selectPendingRequests);
    this.userAddress = this.authService.getUserAddress();
  }

  ngOnInit(): void {
    this.store.dispatch(RequestActions.loadCollectorRequests());
  }

  updateRequestStatus(requestId: number, status: 'Occupied' | 'InProgress' | 'Validated' | 'Rejected') {
    this.store.dispatch(RequestActions.updateRequestStatus({ requestId, status }));
  }
}
