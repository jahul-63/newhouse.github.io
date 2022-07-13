import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  post(url:any,data:any){
    return this.http.post('https://www.team.propira.com/demotesting/api' + url,data);
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else{
      return false;
    }
  }
}
