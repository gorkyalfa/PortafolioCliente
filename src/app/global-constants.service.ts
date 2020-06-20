import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {

  public static apiURL: string = 'http://localhost:3000';
  public static silaboActual: number;

  constructor() { }
}
