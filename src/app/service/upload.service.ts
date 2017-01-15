import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UploadService {
  progress$: any;
  progress: any;
  progressObserver: any;
  constructor () {
    this.progress$ = Observable.create(observer => {
      this.progressObserver = observer
    }).share();
  }

  makeFileRequest (url: string, key:string, file: File): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
      xhr: XMLHttpRequest = new XMLHttpRequest();

     
      formData.append(key, file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('uid', localStorage.getItem('sp_uid'));
      xhr.setRequestHeader('client', localStorage.getItem('sp_client'));
      xhr.setRequestHeader('access-token', localStorage.getItem('sp_access-token'));
      xhr.send(formData);
    });
  }
}