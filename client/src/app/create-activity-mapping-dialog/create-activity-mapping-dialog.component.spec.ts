import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityMappingDialogComponent } from './create-activity-mapping-dialog.component';

describe('CreateActivityMappingDialogComponent', () => {
  let component: CreateActivityMappingDialogComponent;
  let fixture: ComponentFixture<CreateActivityMappingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActivityMappingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
