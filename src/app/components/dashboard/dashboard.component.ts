import { Component, OnInit } from '@angular/core';
import { Category } from '../../services/category.service';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [CategoryService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '' };
  showAddForm = false;

  constructor(private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  viewCategoryRecipes(categoryId: number): void {
    this.router.navigate(['/dashboard/categories', categoryId, 'recipes']);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories loaded:', data);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  addCategory(): void {
    if (this.newCategory.name.trim()) {
      this.categoryService.addCategory(this.newCategory).subscribe({
        next: (category) => {
          this.categories.push(category);
          this.newCategory = { name: '' };
          this.showAddForm = false;
        },
        error: (error) => {
          console.error('Error adding category:', error);
        }
      });
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== id);
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}