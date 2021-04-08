import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'src/app/services/membresia.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-membresia',
  templateUrl: './crear-membresia.component.html',
  styleUrls: ['./crear-membresia.component.scss']
})
export class CrearMembresiaComponent implements OnInit {
  formCrearMembresia: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CrearMembresiaComponent>,
    private formBuilder: FormBuilder,
    public membresiaSrv: MembresiaService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.formCrearMembresia = this.formBuilder.group({
      nombre_membresia: ['', Validators.required],
      texto_membresia: ['', Validators.required],
      precio_membresia: ['', Validators.required]
    });
  }

  submitCrearMembresia(event: Event): void {
    event.preventDefault();
    console.log(this.formCrearMembresia.value);
    const myFormData = new FormData();
    myFormData.append('nombre_membresia', this.formCrearMembresia.get('nombre_membresia').value);
    myFormData.append('texto_membresia', this.formCrearMembresia.get('texto_membresia').value);
    myFormData.append('precio_membresia', this.formCrearMembresia.get('precio_membresia').value);
    this.membresiaSrv.registrarMembresia(myFormData).subscribe(res =>{
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
