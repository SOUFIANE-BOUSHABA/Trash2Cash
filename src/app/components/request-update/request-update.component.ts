import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../core/services/request.service';
import { Request } from '../../core/models/request.model';
import * as RequestActions from '../../state/requests/requests.actions';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './request-update.component.html',
})
export class RequestUpdateComponent implements OnInit {
  requestForm: FormGroup;
  userId: string;
  requestId?: number;
  requestData?: Request;
  private routeSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private authService: AuthService
  ) {
    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: [''],
    });

    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.requestId = +params['id'];
    });

    this.getRequestFromLocalStorage();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getRequestFromLocalStorage() {
    const allRequests: Request[] = JSON.parse(localStorage.getItem('requests') || '[]');

    this.requestData = allRequests.find((req) => req.userId === this.userId && req.id === this.requestId);

    if (this.requestData) {
      this.requestForm.setValue({
        type: this.requestData.type,
        weight: this.requestData.weight,
        address: this.requestData.address,
        date: this.requestData.date,
        time: this.requestData.time,
        notes: this.requestData.notes || '',
      });
    } else {
      console.log('hhhh not found');
      this.router.navigate(['/request-list']);
    }
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const updatedRequest: Request = {
        ...this.requestForm.value,
        id: this.requestId!,
        userId: this.userId,
        status: 'Pending',
      };

      this.requestService.updateRequest(updatedRequest).subscribe(() => {
        this.store.dispatch(RequestActions.addRequestSuccess({ request: updatedRequest }));
        this.router.navigate(['/request-list']);
      });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}
