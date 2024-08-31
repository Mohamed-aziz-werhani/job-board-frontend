import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IJobEntity } from '../../types/entities/job.entity';


export const createInitialState = (): IJobEntity => {
    return {
        id: '',
        title: '',
        description: '',
        company: {},
        applications: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'job' })

export class JobStore extends Store<IJobEntity> {
    constructor() { super(createInitialState()); }
}
