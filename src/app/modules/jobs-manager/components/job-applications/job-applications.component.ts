import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IApplicationEntity } from 'src/app/common/types/entities/application.entity';
import { ApplicationsService } from 'src/app/services/applications.service';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {

  protected currentJobId: string = '';

  protected applications$!: Observable<any>;

  constructor(
    private readonly currentRoute: ActivatedRoute,
    private readonly applicationService: ApplicationsService,
  ) { }

  ngOnInit(): void {
    this.currentJobId = this.currentRoute.snapshot.params['id'];

    this.applications$ = this.applicationService.GET(this.currentJobId);

  }
}
