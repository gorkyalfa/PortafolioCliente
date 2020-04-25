import { Proceso } from './proceso';

export enum TipoContribucion {
    Alta = 'Alta',
    Media = 'Media',
    Baja = 'Baja'
}

export class ResultadoAprendizaje extends Proceso {
    evidencia?: any;
    evidenciaId?: number;
    proceso?: number;
    contribucion?: TipoContribucion;
}
