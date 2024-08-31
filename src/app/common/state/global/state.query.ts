import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalStore } from './state.store';
import { IGobalState } from '../../types/types';

@Injectable({ providedIn: 'root' })
export class GlobalQuery extends Query<IGobalState> {
    constructor(private globalStore: GlobalStore) {
        super(globalStore);
    }

    getLoading(): Observable<boolean> {
        return this.select(state => state.loading);
    }

    getGlobalActionMode(): Observable<'add' | 'edit'> {
        return this.select(state => state.globalActionMode);
    }

    getLocalActionMode(): Observable<'view' | 'edit'> {
        return this.select(state => state.localActionMode);
    }
}