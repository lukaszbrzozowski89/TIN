import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BasicAuthenticationService } from "../basic-authentication.service";

@Injectable({
  providedIn: "root",
})
export class HttpBasicAuthService implements HttpInterceptor {
  constructor(private basicAuth: BasicAuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let basicToken = this.basicAuth.getAuthToken();
    let userName = this.basicAuth.getAuthUser();

    if(basicToken && userName){
      req = req.clone({
        setHeaders: {
          Authorization: basicToken,
        },
      });
      
    }
    return next.handle(req);
  }
}
