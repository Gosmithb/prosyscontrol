import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  //aqui deberia ir tipo de dato con interface ususario o algo
  login(credentials: LoginRequest): Observable<any>{
    return this.http.get<User>('../assets/data.json').pipe(
      catchError(this.hanldeError)
    );

  }

  private hanldeError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);

    } else {
      console.error('Backend retorno codigo de estado ', error.status);

    }
    return throwError(() => Error('intentalo otra vez'))
  }
}
