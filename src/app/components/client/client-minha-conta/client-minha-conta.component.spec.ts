import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMinhaContaComponent } from './client-minha-conta.component';

describe('ClientMinhaContaComponent', () => {
  let component: ClientMinhaContaComponent;
  let fixture: ComponentFixture<ClientMinhaContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMinhaContaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMinhaContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
