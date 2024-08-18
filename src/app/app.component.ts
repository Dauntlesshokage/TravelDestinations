import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'traveldestinations';
  toggleMenu() {
    const nav = document.querySelector('.navas');
    if (nav) {
      nav.classList.toggle('active');
    }
  }
}
