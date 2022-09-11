import { Component, OnInit } from '@angular/core';
import {map, tap, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import * as _ from 'lodash';

interface Course {
  description: string;
  courseListIcon:string;
  iconUrl:string;
  longDescription:string;
  url:string;
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.courses$ = this.http
      .get<Course[]>("https://angular-http-guide.firebaseio.com/courses.json").pipe(
        map(data => _.values(data)),
        tap(console.log)
      );
  }
}
