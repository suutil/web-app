import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { ShopService } from 'app/shared/services/shop.service'
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { NewCategoryModal } from './components/new-category-modal.component';
import { NewSubcategoryModal } from './components/new-subcategory-modal.component';
import { EditCategoryModal } from './components/edit-category-modal.component';


@Component({
    selector: 'category-management',
    templateUrl: './category-management.html'
})
export class CategoryManagementComponent {
    @Input() categories: any
    categoryDatas: any
    newCategory: string
    newSubcategory: string

    constructor(
        private shopService: ShopService,
        private toastManager: ToastsManager,
        private uiModalService: UiModalService) {
    }

    ngOnInit(){

      this.categoryDatas = this.shopService.buildCategoryDatas(this.categories)
      this.shopService.getAllCategories()
      .then(categories=>{
        this.categoryDatas = this.shopService.buildCategoryDatas(categories)
        console.log(this.categoryDatas)
      }
      )
    }

    createCategory() {
      this.shopService.createCategory(this.newCategory)
        .then(cat=> {
          this.categories.push(cat)
        })
        .catch(_ => {
          this.toastManager.error('error')
        });
    }



    openNewCategoryModal() {
          this.uiModalService.openModal(NewCategoryModal, {}, 'Entrar', 'Cancelar')
    }

    openNewSubcategoryModal(category) {
          this.uiModalService.openModal(NewSubcategoryModal, {parentCategory: category}, 'Entrar', 'Cancelar')
    }

    openEditCategoryModal(category) {
          this.uiModalService.openModal(EditCategoryModal, {category: category}, 'Entrar', 'Cancelar')
    }
}
