import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-create-user-modal-dialog',
  templateUrl: './create-user-modal-dialog.component.html',
  styleUrls: ['./create-user-modal-dialog.component.scss']
})
export class CreateUserModalDialogComponent {

  roles!: ['Amin', 'Lead', 'Cashier']
}
