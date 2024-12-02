import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonRow, IonCol } from '@ionic/angular/standalone';
import { FilmsService } from 'src/app/services/films.service';
import { Result } from 'src/app/models/Film';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonRow, IonCol]
})
export class HomePage implements OnInit {
  private filmsSvc = inject(FilmsService);
  private route = inject(Router);
  constructor() { }

  films: Result[] = [];

  async ngOnInit(): Promise<void> {
    this.films = await this.filmsSvc.getFilms(1);
    console.log(this.films);
  }

  goToFilmDetail(id: number) {
    console.log('Film ID:', id);
    this.route.navigate(['film-detail', id]);
  }
}
