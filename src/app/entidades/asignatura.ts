export class Asignatura {
    id?: number;
    nombre: string;
    codigo: string;
    carrera: any;
    totalHorasDocencia: number;
    totalHorasAutonomas: number;
    totalHorasPracticasAprendizaje: number;
    numeroTotalHoras: number;
    periodoAcademico: any;
    modalidad: any;
    contenidoId: number;
    correquisitoId: number;
    prerequisitoId: number;
    periodoLectivo: string;
    unidadOrganizacionCurricular: string;
    campoFormacion: string;
    malla: any;
    correquisito?: any;
    prerequisito?: any;
}
