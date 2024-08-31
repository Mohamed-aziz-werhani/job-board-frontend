/**
 * @description
 * This file will hold all the API routes for the 'jobs' module
 */

const BASE_PREFIX: string = 'jobs'

export const JOBS_API = {
    GET: (id: string) => `${BASE_PREFIX}/${id}`,
    GET_ALL: BASE_PREFIX,
    POST: BASE_PREFIX,
    DELETE: (id: string) => `${BASE_PREFIX}/${id}`,
    PUT: (id: string) => `${BASE_PREFIX}/${id}`,
}