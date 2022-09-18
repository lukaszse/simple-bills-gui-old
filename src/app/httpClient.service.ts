import {Component, Directive, EventEmitter, Injectable, Input, Output, QueryList, ViewChildren} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Config} from "./config";

@Injectable({providedIn: "root"})
export class HttpClientService {


  constructor(private httpClient: HttpClient) {}

  get(endpoint: string) {
    return this.httpClient
      .get(HttpClientService.prepareUrl(endpoint), HttpClientService.prepareHttpOptions())
  }

  private static prepareHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic YW50ZWs6MTIzNDU=`
      })
    };
    console.log(httpOptions)
    return httpOptions;
  }

  private static prepareUrl(endpoint: string) {
    return `${Config.staticSimpleBillsUrl}${endpoint}`;
  }
}


export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}



