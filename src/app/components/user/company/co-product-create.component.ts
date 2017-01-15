import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../service/auth.service';
import { ServiceService } from '../../../service/service.service';
import { UploadService } from '../../../service/upload.service';
import { User, Company } from '../../../model/user';
import { Category, SubCategory } from '../../../model/category';
import { FileUploader } from 'ng2-file-upload';
import { Headers, Http, RequestOptions } from '@angular/http';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'co-product-create',
  templateUrl: 'co-product-create.component.html',
  styleUrls: ['co-product-create.component.css']
})
export class CoProductCreateComponent implements OnInit {
  _auth:Auth;
  user:User;
  categories:Category[];

  name:string;
  description:string;
  selectedCategory:Category;
  selectedSubCategory:SubCategory;


  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private uploadService: UploadService,
    private http:Http,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
      this.uploadService.progress$.subscribe(
      data => {
        console.log('progress = '+data);
      });
    }

  ngOnInit() {
    this._auth.currentUser().then(user => {
      this.user = user;
      this.serviceService.getServiceCategories().then(categories => {
        this.categories = categories;
      })
    })

  }

  onChangeCategory(value){
    this.selectedCategory = value;
  }

  onChangeSubCategory(value){
    this.selectedSubCategory = value;
  }

  file_src: string;
  file:File;
  // This is called when the user selects new files from the upload button
  fileChange(input){

      // Loop through each picture file
      for (var i = 0; i < input.files.length; i++) {

          this.file = input.files[i];

          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[i]);

          // Create a FileReader
          var reader: any, target: EventTarget;
          reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Push the img src (base64 string) into our array that we display in our html template
              this.file_src = img.src;
          }, false);

          reader.readAsDataURL(input.files[i]);
      }
  }

  file_src2: string;
  file2:File;
  // This is called when the user selects new files from the upload button
  fileChange2(input){

      // Loop through each picture file
      for (var i = 0; i < input.files.length; i++) {

          this.file2 = input.files[i];

          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[i]);

          // Create a FileReader
          var reader: any, target: EventTarget;
          reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Push the img src (base64 string) into our array that we display in our html template
              this.file_src2 = img.src;
          }, false);

          reader.readAsDataURL(input.files[i]);
      }
  }
  apiEndPoint = 'https://startuppi.herokuapp.com/api/v1/services/';
  onSubmit(){
    this.serviceService.createService(this.name,true,this.description,this.selectedSubCategory.id,this.user.company.id).then(service =>{

      this.uploadService.makeFileRequest(this.apiEndPoint+service.id,"icon",this.file).subscribe(() => {
        console.log('sent');
        this.uploadService.makeFileRequest(this.apiEndPoint+service.id,"description_icon",this.file2).subscribe(() => {
          console.log('sent');
        });
      });
    })
  }

}
