import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { Places } from '../Interfaces/placesInterface';
import { LambdaResponse } from '../Interfaces/lamdaInterfaces';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  places: Places[] = [];
  destinations: Places[] = [
    {
      title: 'Paris',
      description: 'The City of Light',
      image:
        'https://utfs.io/f/bf37999e-afe1-4143-8b50-7f232197353e-9x8gjr.jpg',
    },
    {
      title: 'Tokyo',
      description: 'The Heart of Japan',
      image:
        'https://utfs.io/f/ddee2cd3-bec8-47c5-8714-e53eb6b1b6f0-1ttap2.png',
    },
    {
      title: 'New York',
      description: 'The Big Apple',
      image:
        'https://utfs.io/f/efd69dd5-a265-4298-84b7-6acbe95bc7ec-czc8sx.jpeg',
    },
  ];
  loading = true;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchDestinations();
  }
  async fetchDestinations() {
    const apiUrl =
      'https://h31o2708ni.execute-api.us-east-1.amazonaws.com/GETmethod';
    await this.http.get<LambdaResponse>(apiUrl).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.places = JSON.parse(response.body) as Places[];
        } else {
          console.error('Unexpected status code:', response.statusCode);
        }
        this.loading = false;
        console.log(this.places);
      },
      error: (error) => {
        console.error('Error fetching destinations:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('Fetch completed');
      },
    });
  }
}
