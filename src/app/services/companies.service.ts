import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompany } from '../common/types/entities/company.entity';
import { COMPANIES_API } from '../common/api/companies.api';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private readonly API = environment.base_api;
  private readonly API_VERSION = environment.api_version;

  constructor(
    private readonly http: HttpClient,
  ) { }

  GET_ALL(): Observable<ICompany[]> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${COMPANIES_API.GET_ALL}`;
    return this.http.get<ICompany[]>(FINAL_URL);
  }

  POST(payload: Partial<ICompany>): Observable<ICompany> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${COMPANIES_API.POST}`;
    return this.http.post<ICompany>(FINAL_URL, payload);
  }

  DELETE(id: string): Observable<ICompany> {
    const FINAL_URL = `${this.API}/${this.API_VERSION}/${COMPANIES_API.DELETE(id)}`;
    return this.http.delete<ICompany>(FINAL_URL);
  }
}
