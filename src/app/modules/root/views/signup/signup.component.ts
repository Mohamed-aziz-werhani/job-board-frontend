import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Auth0Service } from 'src/app/services/auth0.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  protected singupForm!: FormGroup;

  protected userRoles: any[] = [];


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: Auth0Service,
    private readonly router: Router,
    private userService: UserService
  ) {
    // this.userService.getJsonData().subscribe
  }

  ngOnInit(): void {/**
    * This below code takes care of creating a form group instance
    */
    this.singupForm = this.formBuilder.group({
      first_name_control: ['', Validators.required],
      last_name_control: ['', Validators.required],
      email_control: ['', Validators.required],
      password_control: ['', Validators.required],
      confirm_password_control: ['', Validators.required],
      selectFormControl: ['', Validators.required],
    })

    this.userService.getUserRoles()
      .pipe(take(1))
      .subscribe({
        next: (value) => {
          this.userRoles = value;
        }
      })

  }

  onSubmit(): void {
    if (!this.singupForm.valid) return;
    const first_Name = this.singupForm.get('first_name_control')?.value;
    const last_Name = this.singupForm.get('last_name_control')?.value;
    const email_Name = this.singupForm.get('email_control')?.value;
    const password = this.singupForm.get('password_control')?.value;
    const confirm_pass = this.singupForm.get('confirm_password_control')?.value;
    const selectFormControl = this.singupForm.get('selectFormControl')?.value;
    this.authService
    //   .login(userName, password)
    // .subscribe((response) => {
    this.router.navigate(['/']);
    //  });
  }

}
