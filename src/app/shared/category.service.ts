import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories : any[] = [];
  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get('http://localhost:3000/categories').subscribe((categories: any) => {
      this.categories.push({
        id: categories.id,
        label: categories.categoryLabel,
      });
    });
  }
}
