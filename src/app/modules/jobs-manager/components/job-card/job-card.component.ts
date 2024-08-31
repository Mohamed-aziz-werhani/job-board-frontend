import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SNACK_MESSAGES } from 'src/app/common/constants';
import { GlobalStore } from 'src/app/common/state/global/state.store';
import { JobStore } from 'src/app/common/state/job/state.store';
import { IJobEntity } from 'src/app/common/types/entities/job.entity';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent {
  @Input() job: Partial<IJobEntity> = {
    id: '',
    title: 'N.A',
    description: 'N.A',
    company: { name: 'N.A' },
    applications: [],
  };

  @Output() delete: EventEmitter<void> = new EventEmitter();


  constructor(
    private readonly jobsService: JobsService,
    private _snackBar: MatSnackBar,
    private readonly globalStore: GlobalStore,
    private readonly jobsStore: JobStore,
    private readonly router: Router,
  ) { }

  protected navigate(payload: Partial<IJobEntity>, event: any) {

    if (event.target.classList?.[0] === "mat-mdc-button-touch-target") return false;

    // update local state to reduce API calls
    this.jobsStore.update({ ...payload });

    this.router.navigate([`/jobs/${payload.id}`]);
    this.globalStore.update({ globalActionMode: 'edit' });
    this.globalStore.update({ localActionMode: 'view' });
    return true;
  }

  triggerDelete(id: string) {
    this.jobsService.DELETE(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._snackBar.open(SNACK_MESSAGES.success('Job', 'deleted'), 'close');
          this.delete.emit();
        },
        error: (error) => {
          console.error(error);
        }
      })
  }
}
