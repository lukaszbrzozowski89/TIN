import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { API_URL, TOKEN, AUTHENTICATED_USER, USER_ID } from "../app.contants";

@Injectable({
  providedIn: "root",
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}
  userId;

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  getUserID() {
    return sessionStorage.getItem(USER_ID);
  }

  getAuthUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthToken() {
    if (this.getAuthUser()) return sessionStorage.getItem(TOKEN);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ID);
  }

  executeBasicAuthService(userId, username, password) {
    let basicAuth = "Basic " + window.btoa(username + ":" + password);
    let headers = new HttpHeaders({
      Authorization: basicAuth,
    });
    return this.http
      .get<AuthenticationBean>(`${API_URL}basicauth`, { headers })
      .pipe(
        map((data) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(USER_ID, userId);
          sessionStorage.setItem(TOKEN, basicAuth);

          return data;
        })
      );
  }

  executeBasicJWTService(username, password) {
    return this.http
      .post<any>(`${API_URL}authenticate`, { username, password })
      .pipe(
        map((data) => {
          this.userId = this.setId(username);
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          sessionStorage.setItem(USER_ID, this.userId);
          return data;
        })
      );
  }

  setId(name) {
    if (name === "Jan") {
      return this.userId == 1;
    } else if (name === "Kazimierz") {
      return this.userId == 3;
    } else if (name === "Piotr") {
      return this.userId == 4;
    } else if (name === "Roman") {
      return this.userId == 2;
    } else {
      return this.userId == 99;
    }
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
