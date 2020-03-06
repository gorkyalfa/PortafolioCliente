import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-contenido',
  template: '<tree-root (moveNode)="onMoveNode($event)" [nodes]="nodes" [options]="options"></tree-root>'
})
export class ArbolContenidoComponent {
  
  
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  options = {
    allowDrag: true,
    allowDrop: true
  };

  onMoveNode($event) {
    console.log(
      "Moved",
      $event.node.name,
      "to",
      $event.to.parent.name,
      "at index",
      $event.to.index);
  }
  

}
