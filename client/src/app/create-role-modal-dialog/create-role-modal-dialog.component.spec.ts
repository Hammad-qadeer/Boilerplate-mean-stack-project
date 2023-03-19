import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleModalDialogComponent } from './create-role-modal-dialog.component';

describe('CreateRoleModalDialogComponent', () => {
  let component: CreateRoleModalDialogComponent;
  let fixture: ComponentFixture<CreateRoleModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoleModalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoleModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
