import { Component } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories = this.categoryService.categories;
  playerName = this.categoryService.playerName;

  constructor(private categoryService : CategoryService, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
    this.categoryService.getCategories();
    console.log(this.categories);
  }
}
