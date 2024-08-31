import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MAIL_API } from '../common/api/mail.api';

@Injectable({
  providedIn: 'root'
})
export class MailesService {

  private readonly API = environment.base_api;
  private readonly API_VERSION = environment.api_version;

  constructor(
    private readonly http: HttpClient,
  ) { }

  SEND_CONFIRMATION(payload: any) {
    return this.http.post(`${this.API}/${this.API_VERSION}/${MAIL_API.SEND_CONFIRMATION}`, payload)
  }
}
