import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppService } from "./app.service";

export class AuthGuard implements CanActivate {
 constructor(private reflector: Reflector, private appService: AppService) {}

 canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();    
    return request.headers?.authorization === globalThis.googleAccessToken;
 }
}
