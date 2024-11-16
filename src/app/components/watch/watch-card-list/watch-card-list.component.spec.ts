import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchCardListComponent } from './watch-card-list.component';

describe('WatchCardListComponent', () => {
  let component: WatchCardListComponent;
  let fixture: ComponentFixture<WatchCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
