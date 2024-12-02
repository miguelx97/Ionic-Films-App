import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonText, IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/models/Film';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.page.html',
  styleUrls: ['./film-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonText, IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonButtons, IonBackButton],
})
export class FilmDetailPage implements OnInit {

  constructor() { }
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private filmsSvc = inject(FilmsService);
  film?: Result;
  similarFilms: Result[] = [];

  // get film id from route
  async ngOnInit(): Promise<void> {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.film = await this.filmsSvc.getFilmById(id);
    console.log('Film:', this.film);
    this.similarFilms = await this.filmsSvc.getSimilarFilmsById(id);
    console.log('Similar Films:', this.similarFilms);
  }

  goToFilmDetail(id: number) {
    console.log('Film ID:', id);
    this.router.navigate(['film-detail', id]);
  }

}
