import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:"root"})
export class AuthGuard{
    constructor(private authService: AuthService, private router: Router){}
    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ):boolean | Promise<boolean> | Observable<boolean | UrlTree>{
        return this.authService.user.pipe(
            take(1),
            map(user=>{
            // return !!user;
            const isAuth = !!user
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        })
        // ,tap(isAuth=>{
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // })
        );
    }
}