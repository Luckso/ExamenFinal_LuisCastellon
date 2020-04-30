import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.db.getRecorrido(this.id).then(res => {
      this.editForm.setValue({
        actividad: res.actividad,
        costo: res.costo,
        detalle: res.detalle,
        fecha: res.fecha,
        tiempo: res.tiempo
      });
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      actividad: [''],
      costo: [''],
      detalle: [''],
      fecha: [''],
      tiempo: ['']
    });
  }

  exit() {
    this.router.navigate(['/home']);
  }

}
