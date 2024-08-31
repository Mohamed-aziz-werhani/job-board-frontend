import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  protected loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: Auth0Service,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    /**
     * This below code takes care of creating a form group instance
     */
    this.loginForm = this.formBuilder.group({
      email_control: ['', Validators.required],
      password_control: ['', Validators.required],
    })
  }

  /**
   * Using our own authentication service to log users in
   */
  onSubmit(): void {
    if (!this.loginForm.valid) return;

    const userName = this.loginForm.get('email_control')?.value;
    const password = this.loginForm.get('password_control')?.value;

    this.authService
      .login(userName, password)
      .subscribe((response) => {
        this.router.navigate(['/jobs']);
      });
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}


