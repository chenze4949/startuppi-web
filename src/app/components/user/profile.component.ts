import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Auth } from '../../service/auth.service';
import { User, Company } from '../../model/user';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {

  _auth:Auth;
  user:User;
  src;
  constructor(
    private router: Router,private domSanitizer : DomSanitizer,
    private uploadService:UploadService,
    
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
    }

  ngOnInit() {
    this._auth.currentUser().then(user => {
      this.user = user;
    }).catch(error => {
      this._auth.logout();
      this.router.navigate(['/'],{queryParams:{}});
    })

    this.uploadService.progress$.subscribe(
     data => {
      console.log('progress = '+data);
    });
    // this.src = this.domSanitizer.bypassSecurityTrustResourceUrl('https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf');
  }

  apiEndPoint = 'https://startuppi.herokuapp.com/api/v1/users/update';
  update(){
    this._auth.update(this.user).then(succeed => {
      if (succeed){
        if (this.file) {
          this.uploadService.makeFileRequestPost(this.apiEndPoint,"profile_image",this.file).subscribe(() => {
              console.log('sent');
          });
        }
      }
    }).catch(error => {
      this._auth.logout();
      this.router.navigate(['/'],{queryParams:{}});
    })
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
}
