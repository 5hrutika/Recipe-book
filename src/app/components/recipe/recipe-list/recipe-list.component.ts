import { Component } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  categoryId: number|null = null;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    // Get category ID from route parameters
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'] ? +params['categoryId'] : null;
      this.loadRecipes();
    });
  }

  loadRecipes(): void {
    if(this.categoryId) {this.recipeService.getRecipes(this.categoryId).subscribe(recipes => this.recipes = recipes);
    }
  }
}
