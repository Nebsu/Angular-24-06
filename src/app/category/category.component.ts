import { Component } from '@angular/core';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories = this.categoryService.categories;
  constructor(private categoryService : CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories();
    console.log(this.categories);
  }
}
