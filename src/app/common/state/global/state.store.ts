import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IGobalState } from '../../types/types';


export const createInitialState = (): IGobalState => {
    return {
        loading: false,
        globalActionMode: 'add',
        localActionMode: 'view',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'global' })

export class GlobalStore extends Store<IGobalState> {
    constructor() { super(createInitialState()); }
}
