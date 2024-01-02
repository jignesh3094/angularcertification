import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class fwcAPIInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<null>, next: HttpHandler): Observable<HttpEvent<null>> {

  const authReq = req.clone({
    headers: new HttpHeaders({
      'x-rapidapi-host':  'v3.football.api-sports.io',
      'x-rapidapi-key': '7665240133b34e9e912989deb6f21a0b'
    })
  });
  return next.handle(authReq);
}
}