import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// CUSTOM IMPORTS
import { AppRoutingModule } from './app-routing.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLoadingInterceptor } from 'src/app/common/interceptors/http.interceptor';
import { SignupActivateComponent } from './views/signup-activate/signup-activate.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { JobSeekerComponent } from './views/JobSeeker-Singup/Jobseeker-Singup.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SignupComponent } from './views/signup/signup.component';
import { UserService } from 'src/app/services/user.service'
@NgModule({
  declarations: [
    JobSeekerComponent,
    TopBarComponent,
    HomePageComponent,
    LayoutComponent,
    SignupComponent,
    SignupActivateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: { redirect_uri: environment.auth0.redirectUri },
    }),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
