import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApplicationEntity } from '../common/types/entities/application.entity';
import { APPLICATIONS_API } from '../common/api/applications.api';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private readonly API = environment.base_api;
  private readonly API_VERSION = environment.api_version;

  constructor(
    private readonly http: HttpClient,
  ) { }

  POST(payload: Partial<IApplicationEntity>, job_id: string): Observable<IApplicationEntity> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${APPLICATIONS_API.POST(job_id)}`;
    return this.http.post<IApplicationEntity>(FINAL_URL, payload);
  }

  GET(job_id: string): Observable<any> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${APPLICATIONS_API.GET(job_id)}`;
    return this.http.get<any>(FINAL_URL);
  }
}
