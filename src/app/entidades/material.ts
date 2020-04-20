import {TipoMaterial} from '../entidades/tipoMaterial';

export class Material{
    id?: number;
    descripcion: string;
    nombre: string;
    tipoMaterial?: number | TipoMaterial;
    silabo?: any;
}
