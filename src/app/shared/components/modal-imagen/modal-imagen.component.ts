import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.scss']
})
export class ModalImagenComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
