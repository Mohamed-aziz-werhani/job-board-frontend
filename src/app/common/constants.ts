/**
 * @description
 * This file will hold all the constants used in the project.
 * For example, moduel header content, nav bar content etc.
 */

export const NAVIGATION_CONST_CONTAINER = {
    mainNavigation: [
        {
            label: 'Home',
            route: '/',
            icon: 'home',
        },
    ]
}

/**
 * This object maps all the application internal routes
 * This is used to minimize the effort of chaning the routes later on
 */
export const APPLICATION_ROUTES = {
    home: '/',
    jobs: {
        root: 'jobs',
        nested: {
            post: ':id',
            application: ':id/apply'
        }
    }
}

export const SNACK_MESSAGES = {
    success: (record: string, action: string) => `${record} has been ${action} successfully`,
    error: 'Something went wrong',
}