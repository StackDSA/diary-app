import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('https://diary-ge3k7wjvx-stackdsas-projects.vercel.app/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string): Observable<{ success: boolean }> {
    return this.http.post<{ message: string, userId: string }>('https://diary-ge3k7wjvx-stackdsas-projects.vercel.app/user/login', { email, password }).pipe(
      map(response => {
        if (response.message === 'Auth successful') {
          return { success: true };
        } else {
          return { success: false };
        }
      }),
      catchError(() => of({ success: false }))
    );
  }
}