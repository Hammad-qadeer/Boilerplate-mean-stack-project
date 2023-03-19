import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserModalDialogComponent } from './create-user-modal-dialog.component';

describe('CreateUserModalDialogComponent', () => {
  let component: CreateUserModalDialogComponent;
  let fixture: ComponentFixture<CreateUserModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserModalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
