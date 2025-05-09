import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Recipe, RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  constructor(
    private recipeService: RecipeService,

    private route: ActivatedRoute,
    private router: Router
  ) {}
  recipeId: string | null = null;
  recipe: Recipe | null = null;
  ngOnInit(): void {
    console.log("hhere");
    
    this.route.params.subscribe(params => {
      this.recipeId = params['recipeId'];
      if (this.recipeId) {
        this.viewRecipe(this.recipeId);
      }
    });
  }



  viewRecipe(recipeId: string): void {
    this.recipeService.getRecipe(recipeId).subscribe(recipe => this.recipe = recipe);
  }
}
