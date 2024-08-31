import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IApplicationEntity } from 'src/app/common/types/entities/application.entity';
import { ApplicationsService } from 'src/app/services/applications.service';
import { MailesService } from 'src/app/services/mailes.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {

  protected applicationMainForm!: FormGroup;

  protected temp_application: Partial<IApplicationEntity> = {
    id: '',
    applicant_name: '',
    applicant_email: '',
    application_text: '',
  }

  protected currentJobId: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cuerrentRoute: ActivatedRoute,
    private readonly applicationService: ApplicationsService,
    private readonly mailService: MailesService,
    private _snackBar: MatSnackBar,
    private readonly router: Router,
    private http: HttpClient
  ) { }
  fileName: string = 'No file selected';
  ngOnInit(): void {

    this.currentJobId = this.cuerrentRoute.snapshot.params['id'];

    this.createForm();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    }
  }

  createForm() {
    this.applicationMainForm = this.formBuilder.group({
      applicant_name: ['', [Validators.required]],
      applicant_email: ['', [Validators.required]],
      application_text: ['', [Validators.required]],
    });
  }

  onSave() {
    if (!this.applicationMainForm.valid) {
      this.applicationMainForm.markAllAsTouched();
      return;
    }

    this.applicationService.POST(this.applicationMainForm.value, this.currentJobId)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.router.navigate([`/jobs/${this.currentJobId}`]);
          this._snackBar.open('Application sent successfully', 'Close', {
            duration: 3000
          });

          // send email confirmation
          this.mailService.SEND_CONFIRMATION(this.applicationMainForm.value)
            .pipe(take(1))
            .subscribe({
              next: (response) => { }
            })
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}
