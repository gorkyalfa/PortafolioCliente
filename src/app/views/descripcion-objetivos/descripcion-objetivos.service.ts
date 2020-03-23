import { Injectable } from '@angular/core';
import { Asignatura } from '../../entidades/asignatura';
import { ASIGNATURAS } from '../../mocks/mock-asignaturas'
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DescripcionObjetivosService {

  constructor(private http: HttpClient) { }

  BASE_URL: string = 'http://localhost:3000/asignaturas';

  getAsignatura(id: number): Observable<Asignatura> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Asignatura>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Asignatura>(`getHero id=${id}`))
    );
  }

   getAsignaturas(): Observable<Asignatura[]> {
    return of(ASIGNATURAS);
  }

    private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //todo
  }
}

