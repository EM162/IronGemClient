import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../shared/models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  profile: UserProfile | null = null;

  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getProfile().subscribe({

      next: (profile) => {
        this.profile = profile;
        this.isLoading = false;
      },

      error: (error) => {

        this.isLoading = false;

        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
          return;
        }

        this.errorMessage =
          'Unable to load your profile.';
      }

    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}