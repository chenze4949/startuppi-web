import { GroupCategory } from './category'

/**
 * Group
 */
export class Group {
    id:number;
    title:string;
    subtitle:string;
    description:string;
    regulation:string;
    contact:string;
    icon:string;
    qr_code:string;
    group_category:GroupCategory;
}