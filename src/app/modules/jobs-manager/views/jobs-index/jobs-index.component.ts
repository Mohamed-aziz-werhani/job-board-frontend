import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GlobalStore } from 'src/app/common/state/global/state.store';
import { IJobEntity } from 'src/app/common/types/entities/job.entity';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs-index',
  templateUrl: './jobs-index.component.html',
  styleUrls: ['./jobs-index.component.scss']
})
export class JobsIndexComponent implements OnInit {

  protected jobs: Partial<IJobEntity[]> = [];


  constructor(
    private readonly jobsService: JobsService,
    private readonly globalStore: GlobalStore,
  ) { }

  ngOnInit(): void {
    this.fetchJobs();
    this.globalStore.update({ globalActionMode: 'add' });
  }

  protected fetchJobs(): void {
    this.jobsService.GET_ALL()
      .pipe(take(1))
      .subscribe({
        next: (jobs: any) => {
          this.jobs = jobs.data;
        }
      })
  }

  deleteJob(id: string) {
    this.jobs = this.jobs.filter(job => job?.id !== id);
  }


}
