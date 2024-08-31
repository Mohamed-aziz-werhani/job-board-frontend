
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'jobseeker-root',
  templateUrl: './Jobseeker-Singup.component.html',
  styleUrls: ['./Jobseeker-Singup.component.scss']
})



export class JobSeekerComponent implements OnInit {
  jobSeekerForm: FormGroup;
  resumeFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.jobSeekerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      coverLetter: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.resumeFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.jobSeekerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.jobSeekerForm.get('name')?.value);
      formData.append('email', this.jobSeekerForm.get('email')?.value);
      formData.append('coverLetter', this.jobSeekerForm.get('coverLetter')?.value);
      if (this.resumeFile) {
        formData.append('resume', this.resumeFile);
      }
      
      // Send formData to the backend
      // this.yourService.submitJobSeekerForm(formData).subscribe(response => {
      //   console.log(response);
      // });
    }
  }
}
