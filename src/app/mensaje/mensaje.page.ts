import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = [];

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchMensaje().subscribe(item => {
          this.Data = item;
          console.log(this.Data);
        });
      }
    });

    this.mainForm = this.formBuilder.group({
      nombre: [''],
      mensaje: [''],
      email: [''],
    });
  }

  storeData() {
    this.db.addMensaje(
      this.mainForm.value.email,
      this.mainForm.value.mensaje,
      this.mainForm.value.nombre
    ).then(async (res) => {
      this.mainForm.reset();
      const toast = await this.toast.create({
        message: 'Mensaje enviado',
        duration: 3000
      });
      toast.present();
      this.router.navigate(['/home']);
    });
  }

}
