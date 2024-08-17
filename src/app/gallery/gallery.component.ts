import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  places: Places[] = [];
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
