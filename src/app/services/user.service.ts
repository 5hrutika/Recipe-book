import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  password: string;
}
export interface loginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  login(user: loginData): Observable<User> {
    // First, find user by email using query parameter
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
      map((users: User[]) => {
        // Then check password in code
        const foundUser = users.find((u) => u.password === user.password);
        if (!foundUser) {
          throw new Error('Invalid credentials');
        }
        return foundUser;
      })
    );
  }
  register(user: loginData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }
}
