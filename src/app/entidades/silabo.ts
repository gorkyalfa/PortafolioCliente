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
    carreraId: number;
    periodoAcademicoId: number;
    modalidadId: number;
    mallaId: number;
    contenidoId: number;
    docenteId: number;
}
