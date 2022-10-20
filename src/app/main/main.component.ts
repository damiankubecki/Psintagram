import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  image: string = '';
  breeds: string[] = [];
  currentBreed: string = '';

  ngOnInit(): void {
    this.fetchDogs();
  }

  fetchDogs = async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');

    if (!response) return;

    for (const [key] of Object.entries(response.data.message)) {
      this.breeds.push(key);
    }
  };

  fetchBreedImage = async (breed: string) => {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );

    return response.data.message || '';
  };

  handleSelectChange = async (e: Event) => {
    const target = e.target as HTMLSelectElement;

    if (!target.value) {
      this.currentBreed = '';
      this.image = '';
      return;
    }

    this.currentBreed = target.value;
    this.image = await this.fetchBreedImage(target.value);
  };
}
