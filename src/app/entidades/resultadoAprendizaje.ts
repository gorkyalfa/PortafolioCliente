import { Proceso } from './proceso';
import { Evidencia } from './evidencia';

export class ResultadoAprendizaje extends Proceso {
    evidencia?: any;
    evidenciaId?: number;
    proceso?: number;
}
