import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  registerForm = this.fb.nonNullable.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneNumber: [
      '',
      [
        Validators.required
      ]
    ],

    birthDate: [
      '',
      [
        Validators.required
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirmPassword: [
      '',
      [
        Validators.required
      ]
    ],

    agreeToTerms: [
      false,
      [
        Validators.requiredTrue
      ]
    ]
  });

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    const request = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      birthDate: formValue.birthDate,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword
    };

    this.authService.register(request).subscribe({

      next: (response) => {

        this.isLoading = false;

        if (response.isSuccess) {

          this.successMessage =
            'Registration successful! Redirecting to login...';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 1500);

        } else {

          this.errorMessage = response.message;
        }
      },

      error: (error) => {

        this.isLoading = false;

        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.error?.errors) {
          this.errorMessage = 'Please check your information.';
        } else {
          this.errorMessage =
            'Registration failed. Please try again.';
        }
      }

    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}