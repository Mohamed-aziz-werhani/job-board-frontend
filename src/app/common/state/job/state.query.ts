import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JobStore } from './state.store';
import { IJobEntity } from '../../types/entities/job.entity';

@Injectable({ providedIn: 'root' })
export class StoreQuery extends Query<IJobEntity> {
    constructor(private jobStore: JobStore) {
        super(jobStore);
    }

    getLoading(): Observable<boolean> {
        return this.selectLoading();
    }
}