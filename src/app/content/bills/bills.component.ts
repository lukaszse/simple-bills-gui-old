import {Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


interface Course {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

interface Bill {
  billNumber: string;
  user: string
  date: string
  description: string
  category: string
  amount: number,
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  bills$: Observable<Bill[]>

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.bills$ = this.http
      .get<Bill[]>("http://localhost:8080/bills", this.prepareHttpOptions()).pipe(
        tap(console.log)
      );
  }

  prepareHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic YW50ZWs6MTIzNDU=`
      })
    };
    console.log(httpOptions)
    return httpOptions;
  }
}
