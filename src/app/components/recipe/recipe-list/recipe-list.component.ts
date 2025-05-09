import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  categoryId: string | null = null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      if (this.categoryId) {
        this.loadRecipes(this.categoryId);
      }
    });
  }

  viewRecipe(recipeId: string): void {
    this.router.navigate(['/recipe', recipeId]);
  }

  loadRecipes(categoryId: string): void {
    this.recipeService.getRecipes(categoryId).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        console.log('Loaded recipes:', recipes);
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
      }
    });
  }
}
