import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: any[] = [];
  playerName: string = '';
  private categoriesLoaded: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getCategories() {
    if (this.categoriesLoaded) {
      return;
    }

    this.http.get('http://localhost:3000/categories').subscribe((categories: any) => {
      for (const category of categories) {
        this.categories.push({
          id: category.id,
          label: category.categoryLabel,
        });
      }
      this.categoriesLoaded = true;
    });
  }
}