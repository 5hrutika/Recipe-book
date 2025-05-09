import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Recipe {
  id: string;
  categoryId: string;
  title: string;
  ingredients: string;
  instructions: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(categoryId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}?categoryId=${categoryId}`);
  }
  getRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${recipeId}`);
  }
}
