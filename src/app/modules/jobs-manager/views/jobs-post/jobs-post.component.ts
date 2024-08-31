import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { GlobalQuery } from 'src/app/common/state/global/state.query';
import { GlobalStore } from 'src/app/common/state/global/state.store';
import { StoreQuery } from 'src/app/common/state/job/state.query';
import { JobStore } from 'src/app/common/state/job/state.store';
import { IJobEntity } from 'src/app/common/types/entities/job.entity';
import { JobsService } from 'src/app/services/jobs.service';


/**
 * This component is responsible for managing the 'jobs' post route
 * Both the 'view' and 'create/edit' routes are handled by this component
 * 
 * Depending on id passed in the route, 'create' or 'edit' view will be shown
 */

@Component({
  selector: 'app-jobs-post',
  templateUrl: './jobs-post.component.html',
  styleUrls: ['./jobs-post.component.scss']
})
export class JobsPostComponent implements OnInit {

  // local property used to determine whether or not to show the edit form
  protected localActionMode: 'view' | 'edit' = 'view';

  protected currentJobId: string = '';

  protected job: Partial<IJobEntity> = {
    id: '',
    title: '',
    description: '',
    company: {
      id: ''
    },
  };

  constructor(
    private readonly currentRoute: ActivatedRoute,
    private readonly globalStore: GlobalStore,
    private readonly globalQuery: GlobalQuery,
    private readonly jobStore: JobStore,
    private readonly storeQuery: StoreQuery,
    private readonly jobService: JobsService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.trackLocalActionMode();
    this.globalStore.update({ globalActionMode: 'edit' });

    this.syncWithLocalCache();
    this.trackJobChangeOnCreation();
  }

  trackLocalActionMode() {
    // mostly triggered after a job save
    this.globalQuery
      .getLocalActionMode()
      .subscribe({
        next: mode => {
          this.localActionMode = mode;
        }
      })
  }

  syncWithLocalCache() {
    this.job = this.jobStore.getValue();

    if (this.currentJobId !== '0' && this.job.id === '')
      this.jobService.GET(this.currentJobId)
        .pipe(take(1))
        .subscribe({
          next: (response: any) => {
            this.job = response.data;
            this.jobStore.update({ ...response.data });
          }
        })
  }

  trackJobChangeOnCreation() {
    this.storeQuery
      .select()
      .subscribe({
        next: value => {
          this.job = value;
        }
      })
  }

  switchActionMode() {
    this.globalStore.update({ localActionMode: 'edit' });
    this.localActionMode = 'edit';
  }

  onApply() {
    this.currentJobId = this.currentRoute.snapshot.params['id'];
    this.router.navigate([`/application/${this.currentJobId}`]);
  }
}
