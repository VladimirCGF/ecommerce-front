import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMeusPedidosComponent } from './client-meus-pedidos.component';

describe('ClientMeusPedidosComponent', () => {
  let component: ClientMeusPedidosComponent;
  let fixture: ComponentFixture<ClientMeusPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMeusPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMeusPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
