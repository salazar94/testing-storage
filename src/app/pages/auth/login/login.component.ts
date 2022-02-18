import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscriber: Subscription;
  loginRequestSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.loginRequestSubscription = this.authService.loginRequestActive.subscribe(value => {
      this.isLoading = value;
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.valid) {
      this.authService.loginRequestActive.next(true);
      this.subscriber = this.authService.login(this.loginForm.value).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
    this.loginRequestSubscription?.unsubscribe();
  }
}
