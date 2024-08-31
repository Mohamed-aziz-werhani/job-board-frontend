import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJobEntity } from '../common/types/entities/job.entity';
import { JOBS_API } from '../common/api/jobs.api';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private readonly API = environment.base_api;
  private readonly API_VERSION = environment.api_version;

  constructor(
    private readonly http: HttpClient,
  ) { }

  GET(id: string): Observable<IJobEntity[]> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${JOBS_API.GET(id)}`;
    return this.http.get<IJobEntity[]>(FINAL_URL);
  }

  GET_ALL(): Observable<IJobEntity[]> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${JOBS_API.GET_ALL}`;
    return this.http.get<IJobEntity[]>(FINAL_URL);
  }

  POST(job: Partial<IJobEntity>): Observable<IJobEntity> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${JOBS_API.POST}`;
    return this.http.post<IJobEntity>(FINAL_URL, job);
  }

  PUT(job: Partial<IJobEntity>, id: string): Observable<IJobEntity> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${JOBS_API.PUT(id)}`;
    return this.http.patch<IJobEntity>(FINAL_URL, job);
  }

  DELETE(id: string): Observable<IJobEntity> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${JOBS_API.DELETE(id)}`;
    return this.http.delete<IJobEntity>(FINAL_URL);
  }

}
