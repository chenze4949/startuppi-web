import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');
import { Group } from '../model/group';
import { GroupCategory } from '../model/category';


@Injectable()

export class GroupService {
    private hottestGroupsUrl = Globals.host + '/groups/get_hottest_groups';  // URL to web api
    private groupsUrl = Globals.host + '/groups';  // URL to web api
    private groupCategoriesUrl = Globals.host + '/group_categories';  // URL to web api

    constructor(private http:Http) {
        
    }


    getHottestGroups(): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.get(this.hottestGroupsUrl,{headers: headers})
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
    }

    getGroups(category_id:number,current_page:number): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var url = category_id? (this.groupsUrl + "/get_group_by_group_category?group_category_id=" + category_id)  : this.groupsUrl
    if (current_page){
        url = url + (category_id? "&page=" : "?page=") + current_page;
    }
    return this.http.get(url,{headers: headers})
                .toPromise()
                .then(response => response)
                .catch(this.handleError);
    }

    getGroupCategories(): Promise<GroupCategory[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.groupCategoriesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToGroupCategories(response.json().response))
                .catch(this.handleError);
    }

    createGroup(title:string,subtitle:string,description:string,regulation:string,contact:string,group_category_id:number): Promise<Group>{
    let creds = JSON.stringify({title:title,subtitle:subtitle,description:description,
        regulation:regulation,contact:contact,group_category_id:group_category_id});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('uid', localStorage.getItem('sp_uid'));
    headers.append('client', localStorage.getItem('sp_client'));
    headers.append('access-token', localStorage.getItem('sp_access-token'));
    console.log(creds);
    return this.http.post(this.groupsUrl, creds, {headers:headers})
               .toPromise()
               .then(response => this.mapJSONToGroup(response.json().response))
               .catch(this.handleError);
  }

    mapJSONToGroups(data):Group[]{
        let groups = new Array<Group>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        groups.push(this.mapJSONToGroup(element));
        }
        return groups;
    }

    mapJSONToGroup(data){
        let group:Group = new Group();
        group.id = data.id;
        group.title = data.title;
        group.subtitle = data.subtitle;
        group.description = data.description;
        group.regulation = data.regulation;
        group.contact = data.contact;
        group.icon = data.icon;
        group.qr_code = data.qr_code;
        group.group_category = this.mapJSONToCategory(data.group_category);
        return group;
    }

    mapJSONToGroupCategories(data):GroupCategory[]{
        let categories = new Array<GroupCategory>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        categories.push(this.mapJSONToCategory(element));
        }
        return categories;
    }

    mapJSONToCategory(data):GroupCategory{
        let category:GroupCategory = new GroupCategory();
        category.id = data.id;
        category.name = data.name;
        
        return category;
    }


    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}