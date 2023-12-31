import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonorService } from '../donor.service';
import { Requesting } from '../requesting';

@Component({
  selector: 'app-requestblood',
  templateUrl: './requestblood.component.html',
  styleUrls: ['./requestblood.component.css']
})
export class RequestbloodComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  request = new Requesting();
  msg = '';
  
  constructor(private _router : Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.tempUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    }   
    this.loggedUser = this.tempUser;
    this.msg = '';
    this.request.empid = this.donorService.userID;
    //this.request.empid = localStorage.getItem('employeeId');
    // var employeeId = localStorage.getItem('employeeId');
    // console.log("employee id", employeeId);
    // if(employeeId){
    //   console.log("employee id", employeeId);
    //   this.request.empid = parseInt(employeeId);
    // }
  }

  navigateHome()
  {
    this.loggedUser = JSON.stringify(localStorage.getItem('employeeId')|| '{}');
    this._router.navigate(['user', this.loggedUser]);
  }
  
  requestBlood()
  {
    this.donorService.requestForBlood(this.request).subscribe((data) => {
    this._router.navigate(['/requesthistoryfromuser']); 
    }, (error) => {
      console.log('errror from create api',error)
    })
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}
