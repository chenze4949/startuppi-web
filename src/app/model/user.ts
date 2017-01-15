/**
 * User
 */
export class User {
    id:number;
    name:string;
    email:string;
    currency:string;
    profile_image_url:string;
    user_type:string;
    dollar:string;
    company:Company;
}

/**
 * Company
 */
export class Company {
    id:number = 1;
    name:string = "";
    home_page:string = "";
    area:string = "";
    company_size:string = "";
    service_assurance:string = "";
    administrator_id:number = 1;
    contact_person:string = null;
    contact_email:string = null;
    contact_method:string = null;
    introduction:string = null;
    corporation_name:string = null;
    branch_name:string = null;
    business_registration_no:string = null;
    address_cn:string = null;
    address_en:string = null;
    address_remarks:string = null;
    enquiry_hotline:string = null;
    enquiry_email:string = null;
    wechat_id:string = null;
    is_ontime:boolean = false;
    is_originality:boolean = false;
    is_provide_resource:boolean = false;
    is_maintain:boolean = false;
    is_promote:boolean = false;
    is_indemnity:boolean = false;
    opening_time:string = null;
    end_time:string = null;
    business_registration_expired_date:string = null;
    business_registration:string = null;
    photo_intro:string = null
}


