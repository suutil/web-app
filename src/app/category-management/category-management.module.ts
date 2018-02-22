import { UIModule } from 'app/ui/ui.module';
import { CategoryManagementComponent } from './category-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';

import { NewCategoryModal } from './components/new-category-modal.component';
import { NewSubcategoryModal } from './components/new-subcategory-modal.component';
import { EditCategoryModal } from './components/edit-category-modal.component';

//import { SignupProviderModal } from './components/signup-provider-modal.component';





@NgModule({
  // Components, Pipes, Directive
  declarations: [
    CategoryManagementComponent,
    NewCategoryModal,
    NewSubcategoryModal,
    EditCategoryModal
  ],

  providers: [],
  entryComponents: [ NewCategoryModal, NewSubcategoryModal, EditCategoryModal ],

  // Modules
  imports: [
    CommonModule,
    SharedModule,
    UIModule
  ],

  exports: [
    CategoryManagementComponent
  ]
})

export class CategoryManagementModule {

}
