import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { Places } from '../Interfaces/placesInterface';
import { LambdaResponse } from '../Interfaces/lamdaInterfaces';

import {
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.cards.forEach((card) => {
      const elem = card.nativeElement;
      elem.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = ((x - centerX) / centerX) * 5;
        const moveY = ((y - centerY) / centerY) * 5;

        elem.style.transform = `translateY(-5px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
      });

      elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translateY(-5px)';
      });
    });
  }
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
