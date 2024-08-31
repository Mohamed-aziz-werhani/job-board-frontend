import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GlobalStore } from '../state/global/state.store';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(
    private readonly globalStore: GlobalStore,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalStore.update({ loading: true })
    return next.handle(request).pipe(
      finalize(() => this.globalStore.update({ loading: false }))
    );
  }
}
