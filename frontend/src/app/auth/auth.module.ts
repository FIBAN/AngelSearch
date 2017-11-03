import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {InviteComponent} from './invite.component';
import {CallbackComponent} from './callback.component';
import {RegisterComponent} from './register.component';
import {RegistrationNeededComponent} from './registration-needed.component';
import {EmailVerificationMissingComponent} from './email-verification-missing.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: () => localStorage.getItem('token')
  }), http, options);
}

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [InviteComponent, CallbackComponent, RegisterComponent, RegistrationNeededComponent, EmailVerificationMissingComponent ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}
