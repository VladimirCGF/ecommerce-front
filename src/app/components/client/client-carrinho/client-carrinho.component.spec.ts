import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCarrinhoComponent } from './client-carrinho.component';

describe('ClientCarrinhoComponent', () => {
  let component: ClientCarrinhoComponent;
  let fixture: ComponentFixture<ClientCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCarrinhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
