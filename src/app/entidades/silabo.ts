import { Asignatura } from './asignatura';

export class Silabo {
    id?: number;
    nombre: string;
    asignatura: number;
    codigo: string;
    periodoLectivo: string;
    unidadOrganizacionCurricular: string;
    campoFormacion: string;
    totalHorasDocencia: number; 
    totalHorasAutonomas: number;
    totalHorasPracticasAprendizaje: number;
    numeroTotalHoras: number;
    descripcionAsignatura: string;
    objetivoAsignatura: string;
    carreraId: number;
    periodoAcademicoId: number;
    modalidadId: number;
    mallaId: number;
    contenidoId: number;
    docenteId: number;
}