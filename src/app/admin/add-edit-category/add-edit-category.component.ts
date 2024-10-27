import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'cx-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.css'
})
export class AddEditCategoryComponent implements OnInit {
  createCategoryForm: FormGroup = new FormGroup({});
  errors: any;
  categories$: Observable<any>;
  isUpdating: boolean = false;

  constructor(private service: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.createCategoryForm.setControl('category', new FormControl('', [Validators.required]));
    this.createCategoryForm.setControl('id', new FormControl(''));
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.service.getAllCategory();
  }

  createCategory() {
    if (this.createCategoryForm.valid) {
      const category = this.createCategoryForm.value.category;
      this.createCategoryForm.controls['id'].setValue(uuidv4)
      this.createCategoryForm.controls['category'].setValue(category.charAt(0).toUpperCase() + category.slice(1).toLowerCase())
      this.service.getAllCategory().subscribe(
        response => {
          if ((response.filter(result => result.category === this.createCategoryForm.get('category').value)).length <= 0) {
            this.service.addNewCategory(this.createCategoryForm)
              .subscribe(
                result => {
                  alert("category created successfully")
                },
                error => {
                  this.errors = error;
                  alert("error occured")
                  this.createCategoryForm.reset();
                },
                () => {
                  this.createCategoryForm.reset();
                  this.getCategories();
                  this.router.navigate['category']
                }
              );
          } else {
            alert("Don't add duplicate category")
          }
        }
      )
    }
  }

  deleteCategory(id: string) {
    this.service.deleteCategory(id)
      .subscribe(
        result => {
          // Handle result
          alert("category deleted successfully")
        },
        error => {
          alert("Error occured")
        },
        () => {
          this.getCategories();
          this.router.navigate['category']
        }
      );
  }

  editCategory(id: string) {
    this.isUpdating = true;
    this.service.getCategoryById(id).subscribe(data => {
      const category: any = data;
      this.createCategoryForm.controls['id'].setValue(category.id)
      this.createCategoryForm.controls['category'].setValue(category.category)
    })
  }

  updateCategory() {
    const id = this.createCategoryForm.value.id;
    const category = this.createCategoryForm.value.category
    this.createCategoryForm.controls['category'].setValue(category.charAt(0).toUpperCase() + category.slice(1).toLowerCase());
    this.service.updateCategory(id, this.createCategoryForm)
      .subscribe(
        result => {
          // Handle result
          alert("category updated successfully")
        },
        error => {
          this.errors = error;
          alert("Error occured")
          this.isUpdating = false;
          this.createCategoryForm.reset();
        },
        () => {
          this.isUpdating = false;
          this.createCategoryForm.reset();
          this.getCategories();
          this.router.navigate['category']
        }
      );
  }
}
