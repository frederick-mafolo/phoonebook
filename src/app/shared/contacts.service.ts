import { Injectable } from '@angular/core';
import { Contacts } from './contacts.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  // API path
  base_path = 'http://localhost:3000/phonebook';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
    
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item:object): Observable<Contacts> {
    return this.http
      .post<Contacts>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single Contact data by ID
  getItem(id:string): Observable<Contacts> {
    return this.http
      .get<Contacts>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  searchItem(value:string): Observable<Contacts> {
    return this.http
      .get<Contacts>(this.base_path + `?q=${value}`)
      .pipe(
        catchError(this.handleError)
      )
  }



  private contacts$: BehaviorSubject<any> = new BehaviorSubject({});

  public getContacts() {
      return this.contacts$.asObservable();
  }
 
  public updateContacts(data: {}) {
      return this.contacts$.next(data);
  }
  // Get Contacts data
  getList(): Observable<Contacts> {
    return this.http
      .get<Contacts>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Feature not implemented
  updateItem(id:string, item:object): Observable<Contacts> {
    return this.http
      .put<Contacts>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Feature not implemented
  deleteItem(id:string) {
    return this.http
      .delete<Contacts>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
