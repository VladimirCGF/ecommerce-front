import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchFormComponent } from './watch-form.component';

describe('WatchFormComponent', () => {
  let component: WatchFormComponent;
  let fixture: ComponentFixture<WatchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
