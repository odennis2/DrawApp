import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthModel } from 'src/app/models/auth-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USERID_KEY = 'userId';
  private readonly apiUrl = 'https://localhost:7103/api';

  public globalUserInfo: any = {
    email: '',
    userId: '',
  };

  constructor(private http: HttpClient) {}

  authenticate(authData: AuthModel): Observable<any> {
    const authBody = {
      email: authData.email,
      password: authData.password
    }
    this.globalUserInfo.email = authData.email;
    return this.http
    .post(`${this.apiUrl}/Auth/login`, authBody)
    .pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  signup(authData: AuthModel): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/Auth/register`, {
        ...authData,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
      );
  }
  

  getAuthToken(){
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(){
    return sessionStorage.getItem(this.USERID_KEY);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    sessionStorage.removeItem(this.USERID_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
  
  private carsUrl = 'assets/carData.json';

  getCars(): Observable<any> {
    return this.http.get<any>(this.carsUrl);
  }
}
