import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPagamentoComponent } from './client-pagamento.component';

describe('ClientPagamentoComponent', () => {
  let component: ClientPagamentoComponent;
  let fixture: ComponentFixture<ClientPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
