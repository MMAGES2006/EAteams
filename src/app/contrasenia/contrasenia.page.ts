import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.page.html',
  styleUrls: ['./contrasenia.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ContraseniaPage implements OnInit {


  constructor(private alertController: AlertController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  email: string = '';
  password: string = '';

  async onSubmit() {
    try {
      await this.authService.resetPassword(this.email);
      const alert = await this.alertController.create({
        header: 'Signup Success',
        message: 'You have created successfully',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/login']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please complete all',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  onSignUp() {
    this.router.navigateByUrl("login")
  }
}
