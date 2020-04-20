import { EstrategiaMetodologica } from './estrategiaMetodologica';

export class Finalidad {
    id?: number;
    nombre: string;
    estrategiaMetodologicaId?: number;
    estrategiaMetodologica?: EstrategiaMetodologica;
    silabo?: any;
}
