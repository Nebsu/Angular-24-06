import { Component } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories = this.categoryService.categories;
  playerName = this.categoryService.playerName;
  searchTerm : string = '';

  constructor(private categoryService : CategoryService, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
    this.categoryService.getCategories();
    this.route.params.subscribe(params => {
      this.playerName = params['playerName'];
    });
  }

  filteredCategories() {
    return this.categories.filter(category => 
      category.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetSearch(): void {
    this.searchTerm = '';
  }
}
