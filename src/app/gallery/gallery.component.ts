import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

interface LambdaResponse {
  statusCode: number;
  headers: {
    [key: string]: string;
  };
  body: string;
}

interface Destination {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  destinations: Destination[] = [
    {
      title: 'Paris',
      description: 'The capital city of France',
      image:
        'https://utfs.io/f/bf37999e-afe1-4143-8b50-7f232197353e-9x8gjr.jpg',
    },
    {
      title: 'London',
      description: 'The capital city of France',
      image:
        'https://utfs.io/f/bf37999e-afe1-4143-8b50-7f232197353e-9x8gjr.jpg',
    },
    {
      title: 'NewYork',
      description: 'The capital city of France',
      image:
        'https://utfs.io/f/bf37999e-afe1-4143-8b50-7f232197353e-9x8gjr.jpg',
    },
  ];
  places: Destination[] = [];
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
          this.places = JSON.parse(response.body) as Destination[];
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
