import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RequestActions from '../../state/requests/requests.actions';
import { AuthService } from '../../core/services/auth.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports:[ReactiveFormsModule , CommonModule],
  templateUrl: './request-form.component.html'
})
export class RequestFormComponent {
  requestForm: FormGroup;
  userId: string;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {
    this.userId = this.authService.getUserId();

    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const request = { ...this.requestForm.value, userId: this.userId };
      this.store.dispatch(RequestActions.addRequest({ request }));
      this.requestForm.reset();
    }
  }
}
