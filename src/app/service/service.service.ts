import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');
import { Service } from '../model/service';
import { Category, SubCategory } from '../model/category';


@Injectable()

export class ServiceService {
    private hottestServicesUrl = Globals.host + '/services/get_hottest_services';  // URL to web api
    private serviceCategoriesUrl = Globals.host + '/service_categories';  // URL to web api
    private servicesUrl = Globals.host + '/services';  // URL to web api

    constructor(private http:Http) {
        
    }

    getHottestServices(): Promise<Service[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.hottestServicesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToServices(response.json().response))
                .catch(this.handleError);
    }

    getServiceCategories(): Promise<Category[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.serviceCategoriesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToCategories(response.json().response))
                .catch(this.handleError);
    }

    createService(name:string,is_online:boolean,description:string,service_subcategory_id:number,company_id:number): Promise<Service>{
    let creds = JSON.stringify({name:name,is_online:is_online,description:description,
        service_subcategory_id:service_subcategory_id,company_id:company_id});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uid', localStorage.getItem('sp_uid'));
    headers.append('client', localStorage.getItem('sp_client'));
    headers.append('access-token', localStorage.getItem('sp_access-token'));
    console.log(creds);
    return this.http.post(this.servicesUrl, creds, {headers:headers})
               .toPromise()
               .then(response => this.mapJSONToService(response.json().response))
               .catch(this.handleError);
  }

    mapJSONToServices(data):Service[]{
        let services = new Array<Service>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        services.push(this.mapJSONToService(element));
        }
        return services;
    }

    mapJSONToService(data){
        let service:Service = new Service();
        service.id = data.id;
        service.name = data.name;
        service.description = data.description;
        service.icon = data.icon;
        service.is_hot = data.is_hot;
        service.is_online = data.is_online;
        return service;
    }

    mapJSONToCategories(data):Category[]{
        let categories = new Array<Category>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        categories.push(this.mapJSONToCategory(element));
        }
        return categories;
    }

    mapJSONToCategory(data):Category{
        let category:Category = new Category();
        category.id = data.id;
        category.name = data.name;
        let service_subcategories = new Array<SubCategory>();
        for (var index = 0; index < data.service_subcategories.length; index++) {
        var element = data.service_subcategories[index];
        service_subcategories.push(this.mapJSONToSubCategory(element));
        }
        category.service_subcategories = service_subcategories
        
        return category;
    }

    mapJSONToSubCategory(data):SubCategory{
        let category:SubCategory = new SubCategory();
        category.id = data.id;
        category.name = data.name;
        return category;
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}