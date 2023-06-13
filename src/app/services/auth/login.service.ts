import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({
    id:0,
    name: '',
    lastname: '',
    domicilio: '',
    nivel: 0
  })

  constructor(
    private http: HttpClient
  ) { }

  //aqui deberia ir tipo de dato con interface ususario o algo
  login(credentials: LoginRequest): Observable<User>{
    return this.http.get<User>('../assets/data.json').pipe(
      catchError(this.handleError )
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);

    } else {
      console.error('Backend retorno codigo de estado ', error.status);

    }
    return throwError(() => Error('intentalo otra vez'))
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

}
