import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing: boolean = false;
  isLoading: boolean = true;
  userPoints: number = 0;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user => {
        if (user) {
          this.profileForm.patchValue(user);
          this.userPoints = user.points;
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetch user:', error);
        this.isLoading = false;
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.authService.updateUser(this.profileForm.value);
      this.isEditing = false;
    } else {
      this.profileForm.markAllAsTouched();
    }
  }


  deleteAccount() {
    this.authService.deleteAccount();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
