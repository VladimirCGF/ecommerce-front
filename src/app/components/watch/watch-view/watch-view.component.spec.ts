import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchViewComponent } from './watch-view.component';

describe('WatchViewComponent', () => {
  let component: WatchViewComponent;
  let fixture: ComponentFixture<WatchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
