import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: any[] = [];
  private categoriesLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  getCategories() {
    if (this.categoriesLoaded) {
      return;
    }

    this.http.get('http://localhost:3000/categories').subscribe((categories: any) => {
      for (const category of categories) {
        console.log(category);
        this.categories.push({
          id: category.id,
          label: category.categoryLabel,
        });
      }
      this.categoriesLoaded = true;
    });
  }
}