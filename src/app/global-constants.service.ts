import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {

  public static apiURL: string = 'https://portafolio-docente.herokuapp.com';
  public static silaboActual: number;

  constructor() { }
}
