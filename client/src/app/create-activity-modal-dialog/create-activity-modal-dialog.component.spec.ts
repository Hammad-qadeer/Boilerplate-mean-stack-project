import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityModalDialogComponent } from './create-activity-modal-dialog.component';

describe('CreateActivityModalDialogComponent', () => {
  let component: CreateActivityModalDialogComponent;
  let fixture: ComponentFixture<CreateActivityModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActivityModalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
