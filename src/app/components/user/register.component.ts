import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import $ = require("jquery");

@Component({
  selector: 'sp-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  busy: Promise<any>;
  templete = `
        <div style="background: url('/assets/images/du.gif') no-repeat center 20px; background-size: 72px;">
            <div style="margin-top: 110px; text-align: center; font-size: 18px; font-weight: 700;">
                {{message}}
            </div>
        </div>
    `
  form: FormGroup;
  
  _auth:Auth;
  email:string = "";
  password:string = "";
  name:string = "";

  is_accepted = false;

  alertTitle = "";
  alertDetail = "";

  constructor(
    private router: Router,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;

      
      this.form = new FormGroup({
          name: new FormControl('', CustomValidators.rangeLength([6, 20])),
          email: new FormControl('', CustomValidators.email),
          password: new FormControl('', CustomValidators.rangeLength([6, 20]))
      });
    }

  ngOnInit() {
  }

  register(){
    if($("#checkTermsAndPrivacy").prop('checked') == false){
    //do something
      this.alertTitle = "信息不完整！";
      this.alertDetail = "請閱讀并同意私隱政策、法律聲明。";
      this.open();
    }else{
      this.busy = this._auth.signUp(this.email, this.password, this.name).then( user => {
          this.busy = this._auth.signIn(this.email, this.password).then( user => {
                this.router.navigate(['/'],{queryParams:{}});
          }).catch(error => {
            console.log(error);
          })
      }).catch(error => {
        console.log(error);
        this.alertTitle = "注册失败！";
        this.alertDetail = "该邮箱已被注册。";
        this.open()
      })
    }
    
    
  }

  public opened: boolean = false;

  /**
   * isValid
   */
  public isValid() {
    return this.form.valid
     && this.name.length>0 && this.email.length>0 && this.password.length>0
  }

  public close() {
    this.opened = false;
  }

  public open() {
    if (this.isValid()){
      this.opened = true;
    }

  }

}
