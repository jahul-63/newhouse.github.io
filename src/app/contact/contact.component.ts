import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private fb:FormBuilder,private serve:ServiceService) { }

  ngOnInit(): void {
    window.scroll(0,0);
  }
  contactform=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required]],
    phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    state_id:['',[Validators.required]],
    city_id:['',[Validators.required]],
    subject:['',[Validators.required]],
    message:['',[Validators.required]]
  })

  submitForm:boolean = false;

  onsubmit(){
    if(this.contactform.valid){
      this.serve.post('/contactEnd',this.contactform.value).subscribe((res)=>{
        console.log(this.contactform.value);
        console.log(res);
        this.contactform.reset();
        this.submitForm = false;
        // alert(res[0].msg);
      })}
      else
      {
        this.submitForm = true;
      }
  }

}
