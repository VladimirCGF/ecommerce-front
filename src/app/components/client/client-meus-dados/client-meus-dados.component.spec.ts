import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeusDadosComponent } from './client-meus-dados.component';

describe('ClientPerfilComponent', () => {
  let component: ClientMeusDadosComponent;
  let fixture: ComponentFixture<ClientMeusDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMeusDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMeusDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
