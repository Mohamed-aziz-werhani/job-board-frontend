/**
 * @description
 * This file hoolds all the generic types used in the project.
 * For example, types used for the navigation, module header content, etc.
 */

export interface IGobalState {
    loading: boolean,
    globalActionMode: 'add' | 'edit', // set global action button to + or edit
    localActionMode: 'view' | 'edit', // set /:id views to be view or edit
}
