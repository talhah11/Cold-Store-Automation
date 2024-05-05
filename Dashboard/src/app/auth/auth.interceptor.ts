import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment.prod"
import { map } from "rxjs/operators";
import { UtilService } from "../util/util.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private util: UtilService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this._authService.user;
    const issbe = req.url.includes('searchbe');
    if(req.url.includes('random_row') || req.url.includes('predict')
     || req.url.includes('openweathermap')
     || req.url.includes('get_data')
     || req.url.includes('send-email')) {
      return next.handle(req);
    }
    let request = issbe ? req : req.clone({ url: `${environment.apiUrl}${req.url}` });
    if (user) {
      request = request.clone({ headers: req.headers.set('Authorization', `Bearer ${user.jwt}`) })
    }
    return next.handle(request).pipe(issbe ? this.unpack() : this.strapiNormilize());
  }

  unpack() {
    let util = this.util;

    return map((res: any) => {
      let body = res;
      if (body && body.body) {
        body = body.body;
        if (body.data) {
          body = body.data;
        }
      }
      let unpacked = Array.isArray(body) ? body.map(d => util.arrayUnpack(d) as any) : util.arrayUnpack(body);
      //console.log('search be unpack', unpacked)
      res.body = unpacked;
      return res;
    })
  }

  strapiNormilize() {
    let util = this.util;
    return map(res => {
      let x = util.normalize(res) as any;
      if (x && x.body && x.body.data) {
        console.log("piping in auth.interceptor.ts", x.body.data)
      }
      return x;
    });
  }

}




