import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  AuthResponse,
  ApiResponse
} from '../../shared/models/auth';

import {
  UserProfile,
  UpdateProfileRequest
} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Change this to your actual backend URL
  private apiUrl = 'https://localhost:7083/api/Auth';

  private readonly tokenKey = 'ironGemToken';
  private readonly userKey = 'ironGemUser';

  register(request: RegisterRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      request
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(
          this.userKey,
          JSON.stringify({
            email: response.email,
            role: response.role
          })
        );
      })
    );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/profile`
    );
  }

  updateProfile(
    request: UpdateProfileRequest
  ): Observable<ApiResponse> {

    return this.http.put<ApiResponse>(
      `${this.apiUrl}/profile`,
      request
    );
  }

  changePassword(
    request: ChangePasswordRequest
  ): Observable<ApiResponse> {

    return this.http.post<ApiResponse>(
      `${this.apiUrl}/change-password`,
      request
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getStoredUser(): { email: string; role: string } | null {
    const user = localStorage.getItem(this.userKey);

    return user ? JSON.parse(user) : null;
  }
}