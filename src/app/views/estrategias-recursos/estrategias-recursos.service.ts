import { Injectable } from '@angular/core';
import { Observable,of } from "rxjs";
import { TIPOMATERIAL } from "../../mocks/mock-tipoMaterial";

@Injectable({
  providedIn: 'root'
})
export class EstrategiasRecursosService {
  constructor() { }

  getDatos(): Observable<any>{
    return of(TIPOMATERIAL);
  }

};


  

