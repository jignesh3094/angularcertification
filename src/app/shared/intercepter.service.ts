import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class fwcAPIInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const authReq = req.clone({
    headers: new HttpHeaders({
      'x-rapidapi-host':  'v3.football.api-sports.io',
      'x-rapidapi-key': '7665240133b34e9e912989deb6f21a0b'
    })
  });

  console.log('Intercepted HTTP call', authReq);

  return next.handle(authReq);
}
}