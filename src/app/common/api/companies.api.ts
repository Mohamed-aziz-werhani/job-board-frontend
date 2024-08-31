/**
 * @description
 * This file will hold all the API routes for the 'companies' entity
 */

const BASE_PREFIX: string = 'companies'

export const COMPANIES_API = {
    GET_ALL: BASE_PREFIX,
    POST: BASE_PREFIX,
    DELETE: (id: string) => `${BASE_PREFIX}/${id}`,
}