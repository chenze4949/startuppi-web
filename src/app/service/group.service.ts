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
    private groupsUrl = Globals.host + '/groups';  // URL to web api
    private groupCategoriesUrl = Globals.host + '/group_categories';  // URL to web api

    constructor(private http:Http) {
        
    }

    getGroups(): Promise<Group[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.groupsUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToGroups(response.json().response))
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
        group.icon = data.icon;
        group.qr_code = data.qr_code;
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