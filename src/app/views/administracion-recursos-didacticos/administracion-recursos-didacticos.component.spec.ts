import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionRecursosDidacticosComponent } from './administracion-recursos-didacticos.component';

describe('AdministracionRecursosDidacticosComponent', () => {
  let component: AdministracionRecursosDidacticosComponent;
  let fixture: ComponentFixture<AdministracionRecursosDidacticosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionRecursosDidacticosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionRecursosDidacticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
