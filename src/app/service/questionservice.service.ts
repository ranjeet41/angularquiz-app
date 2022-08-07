import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { catchError, Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {
  apiUrl: string = 'http://localhost:3000/questions';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  getquestionjson(){
    return this.http.get<any>('assets/question.json')
  }

getquestionApi(){
  return this.http.get<any>('http://localhost:3000/questions')
}

createQuestion(data:any):Observable<any>{
  let API_URL = this.apiUrl;
  return this.http.post(API_URL,data).pipe(catchError(this.handleError))
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
}

