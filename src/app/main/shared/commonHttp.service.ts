import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BASEURL } from './app.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CommonHttpService {
  traverseService: any;
  storeData: any;
  categories: any;
  organizationId: any
  header: any = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));


  constructor(
    private httpClient: HttpClient
  ) { }

  // Getting Access Token 

  private getAccessToken() {

    return 'Bearer ' + (localStorage.getItem('access_token') || '');

  }

  // Add Headers

  private addHeaders(optionalHeaders?: HttpHeaders) {

    let requestHeaders = new HttpHeaders()
      .set('Authorization', this.getAccessToken())
    if (optionalHeaders) {
      for (const header of optionalHeaders.keys()) {
        requestHeaders = requestHeaders.append(header, optionalHeaders.get(header));
      }
    }
    return requestHeaders;
  }

  // Get Request

  get(url: string, options?: HttpHeaders) {

    let headers = this.addHeaders(options);

    return this.httpClient.get(BASEURL + url, { headers: headers, observe: 'response' })
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Post Request

  post(url: string, body: any, options?: HttpHeaders) {

    let headers = this.addHeaders(options);

    return this.httpClient.get(BASEURL + url, { headers: headers, observe: 'response' })
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Extracting Data

  private extractData(res: HttpResponse<any>) {

    // console.log('inside extract data', res);
    return res.body || res.status;
  }

  // Error Handling

  private handleError(err: HttpErrorResponse) {
    // console.log('inside handle error', err);
    let errorInfo: any = {};

    if (err.error instanceof Error || err.error instanceof ProgressEvent) {
      /**A client-side or network error occurred. Handle it accordingly.*/
      // console.log('An error occurred:', );
      errorInfo.status = err.status;
      errorInfo.status == 0 ? errorInfo.msg = "No Internet, Check Your connection Or Try again" : errorInfo = err.message || 'Some Error Occured';
    }
    else {
      /**The backend returned an unsuccessful response code.*/
      // console.log('Server occurred:', err);
      errorInfo.status = err.status;
      errorInfo.msg = err.error.error || err.error.message || 'Internal Server Error';
    }
    return Observable.throw(errorInfo);

  }
















  // All departments

  // getDepartments(): any {

  //   return this.httpClient.get(BASEURL + `/admin/departments`, {
  //     headers: this.header
  //   });
  // }

  // All categories 

  getCategories(): any {
    return this.httpClient.get(BASEURL + '/categories', {
      headers: this.header
    });
  }

  // All Employees

  // getEmployees(): any {
  //   return this.httpClient.get(BASEURL + '/admin/employees', {
  //     headers: this.header
  //   });
  // }

  // All subscriptions

  // getSubscriptions(): any {
  //   return this.httpClient.get(BASEURL + `/admin/subscriptions`, {
  //     headers: this.header
  //   })
  // }

  // My Courses

  // getMyCourses(): any {
  //   return this.httpClient.get(BASEURL + `/admin/my-courses`, {
  //     headers: this.header
  //   })
  // }

  // Employees List

  // getEmployeesList(): any {
  //   return this.httpClient.get(BASEURL + '/admin/employees?role=employee', {
  //     headers: this.header
  //   })
  // }

  // Managers List

  // getManagersList(): any {
  //   return this.httpClient.get(BASEURL + '/admin/employees?role=manager', {
  //     headers: this.header
  //   })
  // }

  // Manager Task

  getManagerTaskList(): any {
    return this.httpClient.get(BASEURL + '/admin/assign/tasks', {
      headers: this.header
    })
  }

}