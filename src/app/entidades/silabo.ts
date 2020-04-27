import { Asignatura } from './asignatura';

export class Silabo {
    id?: number;
    nombre: string;
    asignaturaId: number;
    codigo: string;
    periodoLectivo: any;
    unidadOrganizacionCurricular: string;
    campoFormacion: string;
    totalHorasDocencia: number;
    totalHorasAutonomas: number;
    totalHorasPracticasAprendizaje: number;
    numeroTotalHoras: number;
    descripcionAsignatura: string;
    objetivoAsignatura: string;
    carrera: any;
    periodoAcademico: any;
    modalidad: any;
    malla: any;
    contenidoId: number;
    docenteId: number;
    observacion: string;
    prerrequisitos: any;
    correquisitos: any;
}
