import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SNACK_MESSAGES } from 'src/app/common/constants';
import { GlobalStore } from 'src/app/common/state/global/state.store';
import { JobStore } from 'src/app/common/state/job/state.store';
import { ICompany } from 'src/app/common/types/entities/company.entity';
import { IJobEntity } from 'src/app/common/types/entities/job.entity';
import { CompaniesService } from 'src/app/services/companies.service';
import { JobsService } from 'src/app/services/jobs.service';
import { CompanyFormComponent } from '../company-form/company-form.component';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  protected jobMainForm!: FormGroup;

  protected currentJobId: string = '';

  protected job_temp: Partial<IJobEntity> = {
    id: '',
    title: '',
    description: '',
    company: {
      id: ''
    },
  };

  // local attribute to hold available companies list
  // (used for autocomplete)
  protected companies_list: Partial<ICompany[]> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly jobService: JobsService,
    private readonly companiesService: CompaniesService,
    private _snackBar: MatSnackBar,
    private readonly globalStore: GlobalStore,
    private readonly jobStore: JobStore,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    // get the id from the route
    this.currentJobId = this.activatedRoute.snapshot.params['id'];

    this.getCompanies();

    this.syncWithLocalCache();
  }

  getCompanies() {
    this.companiesService.GET_ALL()
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.companies_list = response.data;
        }
      })
  }

  /**
   * Making sure the view has the correct job data patched in
   * even if the user regreshes the page
   */
  syncWithLocalCache() {
    let cache = this.jobStore.getValue();

    if (cache.id === '' && this.currentJobId.length !== 1) {
      // user refreshed view and local cache has reset, so refetch from backend
      this.jobService.GET(this.currentJobId)
        .pipe(take(1))
        .subscribe({
          next: (response: any) => {
            this.jobStore.update({ ...response.data });
            cache = { ...response.data };
            this.continueSync(cache);
          }
        })
    }

    this.continueSync(cache);
    return true;
  }

  continueSync(cache: any) {
    if (cache.id === '') {
      // local cache is empty, proceed with clean form
      this.createForm();
      return false;
    }

    this.job_temp.id = cache.id;
    this.job_temp.title = cache.title;
    this.job_temp.description = cache.description;
    this.job_temp.company = cache.company.id;

    // creating form with updated values
    this.createForm();
    return true;
  }

  /**
   * This method creates the job form
   * It initializes the form with the temp object
   */
  createForm() {
    this.jobMainForm = this.formBuilder.group({
      title: [this.job_temp.title, [Validators.required]],
      description: [this.job_temp.description, [Validators.required]],
      company: [this.job_temp.company, [Validators.required]],
    });
  }

  onCompanyAdd() {
    const dialogRef = this.dialog.open(CompanyFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this._snackBar.open(SNACK_MESSAGES.success('Company', 'created'), 'close');
      this.getCompanies();
    });
  }

  /**
   * This method creates a new job
   */
  createJob() {
    this.jobService.POST(this.jobMainForm.value)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this._snackBar.open(SNACK_MESSAGES.success('Job', 'created'), 'close');
          this.globalStore.update({ localActionMode: 'view' });
          this.jobStore.update({ ...response.data });
          this.router.navigate(['/jobs']); 
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  /**
   * This method updates an existing job
   */
  updateJob() {
    this.jobService.PUT(this.jobMainForm.value, this.currentJobId)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this._snackBar.open(SNACK_MESSAGES.success('Job', 'updated'), 'close');
          this.globalStore.update({ localActionMode: 'view' });
          this.jobStore.update({ ...this.jobMainForm.value });
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  /**
   * This method takes care of saving the job form
   * based on the passed in ID
   */
  onSave() {
    if (!this.jobMainForm.valid) {
      this.jobMainForm.markAllAsTouched();
      return;
    }

    if (this.currentJobId === '0')
      this.createJob();

    if (this.currentJobId !== '0')
      this.updateJob();
  }
}
