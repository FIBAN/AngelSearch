import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { environment } from '../environments/environment';

@Component({
  templateUrl: 'landing.component.html'
})
export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('existingAngelId') angelIdOverrideInput: ElementRef;

  loggedIn = false;
  notProductionEnvironment =  ! environment.production;

  private authStatusSub: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.authStatusSub = this.authService.authStatus$.distinctUntilChanged().subscribe((status) => {
        if (this.loggedIn === false && status !== AuthService.AUTH_STATUS.LOGGED_OUT) {
          this.loggedIn = true;
          this.router.navigate(['/angels']);
        }
      });
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

  logIn(angelIdOverride: string): void {
    angelIdOverride = this.angelIdOverrideInput && this.angelIdOverrideInput.nativeElement.value;
    angelIdOverride = angelIdOverride && angelIdOverride.trim();

    if (this.notProductionEnvironment && angelIdOverride) {
      this.authService.login({developmentLogInAngelIdOverride: angelIdOverride});
    } else {
      this.authService.login();
    }
  }

}
