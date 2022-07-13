import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { ServiceService } from '../services/service.service';
import { SocialUser} from 'angularx-social-login';
import { GoogleLoginProvider , FacebookLoginProvider} from 'angularx-social-login';
declare var google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginSuccMsg:any;
  loginErrorMsg:any;
  latitude!: number;
  longitude!: number;
  public alwarBounds:any;

  constructor(private Formbuild:FormBuilder,private serve:ServiceService,private authService : AuthService) { }

  ngOnInit(): void {
    this.alwarBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(27.499874, 76.5542804),
      new google.maps.LatLng(27.6727726, 76.6965866)
    );
    window.scroll(0,0);
  }
  submitForm:boolean = false ;

  loginForm = this.Formbuild.group({
    email_mobile:['',Validators.required],
    password_otp:['',Validators.required],
    type:'Web'
  })

  
  chkLogin() {
    if(this.loginForm.valid){
 
      this.serve.post('/login',this.loginForm.value).subscribe((data:any) => {
        localStorage.setItem('currentUser', JSON.stringify(data[0]));
      })}
      else
      {
        this.submitForm = true ;
      }
}
genOtpByMobile() {
  this.loginSuccMsg="";
  this.loginErrorMsg="";

  if(this.loginForm.get('email_mobile')?.value !=''){
    this.serve.post('/sendOtpByMobile',{type:"web",mobile:this.loginForm.get('email_mobile')?.value}).subscribe(data=>{
      console.log(data);
    })
  }
}

isLoggedIn() {
  return this.serve.isLoggedIn();
}

logout() {
  localStorage.removeItem('currentUser');
}

get profileDEtail(){return JSON.parse(localStorage.getItem('currentUser')||('currentUser'))}

options:any={
  ComponentRetrictions :{
    country:['IN']
  }
    }
  
    formattedAddress = '';
    public handleAddressChange(address: any) {
      this.formattedAddress = address.formatted_Address;
      // console.table(address.coords);
      // this.latitude = address.coords.lat;
      // this.longitude = address.coords.lng;
      this.latitude=address.geometry.location.lat();
      this.longitude =  address.geometry.location.lng();
      console.log("longitude of city : ",address.geometry.location.lat());
      console.log("longitude of city : ",address.geometry.location.lng());
    }
    googleLogin() : any{
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
  
        var data = {
          "type": "Web",
          "name": user.name,
          "email": user.email,
          "gender": "1",
          "user_type": "1",
          "image": user.photoUrl,
          "registration_type": "3"
      };
      console.log(data);
    })
  }
  
    facebookLogin(){
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
        var data = {
          "type": "Web",
          "name": user.name,
          "email": user.email,
          "gender": "1",
          "user_type": "1",
          "image": user.photoUrl,
          "registration_type": "3"
        };
        console.log(data);
    })
  }
  
}
