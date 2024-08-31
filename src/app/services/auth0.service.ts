import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PASSWORD_PARAMS } from '../common/constants';


@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private readonly router: Router,
  ) { }

  login(username: string, password: string) {

    const final_url = `https://${environment.auth0.domain}/oauth/token`;

    const payload = {
      grant_type: 'password',
      username,
      password,
      audience: environment.auth0.audience,
      scope: 'openid profile email',
      client_id: environment.auth0.clientId,
    }

    return this.http.post<any>(final_url, payload)
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('id_token', response.id_token);
          this.fetchUserProfile();
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(error => {
          console.error('Login error:', error);
          this.isAuthenticatedSubject.next(false);
          return of(false);
        })
      );
  }

  createAccount(email: string) {
    const final_url = `https://${environment.auth0.domain}/dbconnections/signup`;

    const payload = {
      client_id: environment.auth0.clientId,
      email,
      password: this.generatePassword(),
      connection: 'Username-Password-Authentication'
    }

    return this.http.post<any>(final_url, payload)
      .pipe(
        tap(response => {
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('sub');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  fetchUserProfile() {
    const token = localStorage.getItem('access_token');

    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const final_url = `https://${environment.auth0.domain}/userinfo`;

    if (!token) return of(null);

    return this.http.get(final_url, options)
      .subscribe((user: any) => {
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('sub', JSON.stringify(user.sub.split('|')[1]));
      });
  }

  // utility function
  generatePassword() {
    const passwordParams = PASSWORD_PARAMS;
    const characters = (passwordParams.lower + passwordParams.upper + passwordParams.numeric + passwordParams.symbols).split('');
    const data = this.shuffleArray(characters).join('').substring(0, passwordParams.length);
    return data;
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
