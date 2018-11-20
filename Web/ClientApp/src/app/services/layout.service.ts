import { Inject, Injectable, Sanitizer } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../../entities/table'
import { Layout } from '../../entities/layout'
import { DomSanitizer } from '@angular/platform-browser';
import { Link } from '../../entities/link';

@Injectable()
export class LayoutService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getTables(layoutId: number) {
    return this.http.get<Table[]>(this.baseUrl + 'api/Layout/GetTables/' + layoutId)
  }

  getLayouts(restaurantId: number) {
    return this.http.get<Layout[]>(this.baseUrl + 'api/Layout/GetLayouts/' + restaurantId);
  }

  getLinks(layoutId: number) {
    return this.http.get<Link[]>(this.baseUrl + 'api/Layout/GetLinks/' + layoutId)
  }

  saveLayout(layout: Layout, tables: Table[], links: Link[]) {
    var url = this.baseUrl + 'api/Layout/SaveLayout';
    var body = {
      layout: layout,
      tables: tables,
      links: links
    }
    this.http.post(url, body).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  saveTables(tables: Table[]) {
    // get restu
  }

}
