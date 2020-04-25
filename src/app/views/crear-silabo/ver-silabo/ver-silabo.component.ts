import { Component, OnInit } from '@angular/core';
import { SilaboServiceService } from '../silabo-service.service';
import { Silabo } from '../../../entidades/silabo';
import { DescripcionObjetivosService } from '../../descripcion-objetivos/descripcion-objetivos.service';
import { ResultadoAprendizajeAsignaturaService } from '../../resultado-aprendizaje-asignatura/resultado-aprendizaje-asignatura.service';
import { ContenidoAsignaturaService } from '../../contenido-asignatura/contenido-asignatura.service';
import { EstrategiasRecursosService } from '../../estrategias-recursos/estrategias-recursos.service';

@Component({
  selector: 'app-ver-silabo',
  templateUrl: './ver-silabo.component.html',
})
export class VerSilaboComponent implements OnInit {

  silabo: Silabo;

  constructor(
    private silaboService: SilaboServiceService,
    private descObjeService: DescripcionObjetivosService,
    private resultadosService: ResultadoAprendizajeAsignaturaService,
    private contenidosAsignaturaService: ContenidoAsignaturaService,
    private recursosService: EstrategiasRecursosService
  ) { }

  ngOnInit(): void {
  }

}
