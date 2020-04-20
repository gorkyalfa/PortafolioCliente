export class Asignatura {
    id?: number;
    nombre: string;
    codigo: string;
    carreraId: number;
    totalHorasDocencia: number;
    totalHorasAutonomas: number;
    totalHorasPracticasAprendizaje: number;
    numeroTotalHoras: number;
    periodoAcademicoId: number;
    modalidadId: number;
    contenidoId: number;
    correquisitoId: number;
    prerequisitoId: number;
    periodoLectivo: string;
    unidadOrganizacionCurricular: string;
    campoFormacion: string;
    mallaId: number;
    correquisito?: any;
    prerequisito?: any;
}
