/**
 * @description
 * This file holds all the interface definitions for the Job Entity
 */

import { IApplicationEntity } from "./application.entity";
import { ICompany } from "./company.entity";

export interface IJobEntity {
    id: string;
    title: string;
    description: string;
    company: Partial<ICompany>;
    applications: Partial<IApplicationEntity[]>;
}