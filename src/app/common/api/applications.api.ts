/**
 * @description
 * This file will hold all the API routes for the 'applications' entity
 */

const BASE_PREFIX: string = 'applications'

export const APPLICATIONS_API = {
    POST: (job_id: string) => `${BASE_PREFIX}/${job_id}`,
    GET: (job_id: string) => `${BASE_PREFIX}/${job_id}`,
}