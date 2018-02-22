import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'app/shared/authentication.service';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Route } from '@angular/router';
import { UsersService } from 'app/shared/services/api/users.service';
import { ShopService } from 'app/shared/services/shop.service';
import { SetCategoryModal } from 'app/provider-dashboard/components/set-category-modal.component';
import { UiModalService } from 'app/ui-modal/ui-modal.service';



@Component({
    selector: 'create-shop',
    templateUrl: './create-shop.html'
})
export class CreateShopComponent {
    @Input() user: any
    @Input() shop: any = {
        categories: [],
        tags: []
    }
    currentCategories: any
    showCategoryModal: boolean = false
    showTagModal: boolean = false
    showCountryModal: boolean = false
    isLoading = false;
    @Input() categories: any
    @Input() tags: any
    categoryDatas: any
    shopTagsPlaceholder: any
    countries: any

    constructor(private toastManager: ToastsManager,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private shopService: ShopService,
        private uiModalService: UiModalService) { }

    ngOnInit() {
        this.categoryDatas = this.shopService.buildCategoryDatas(this.categories)
        this._getCurrentTags(this.tags, this.shop)
        this.countries = this.shopService.getCountries()
        this._getCurrentCategory(this.shop, this.categories)
    }

    onSubmit(f: NgForm) {
        this.isLoading = true
        this.shopService.updateShop(this.shop._id, this.shop)
            .then(result => {
                this.toastManager.success('Datos de tu espacio de proveedor actualizados')
            })
        this.usersService.patchMe(this.user)
            .then(user => {
                this.toastManager.success('Datos de la cuenta actualizados')
                this.isLoading = false
            })
    }

    createShop() {
        this.shopService.createShop(this.user._id)
            .then(result => { })
    }

    saveAccountInfo() {
        this.usersService.patchMe(this.user)
            .then(user => {
                this.toastManager.success('Datos de la cuenta actualizados')
            })
    }

    toggleCategoryModal() {
        this.showCategoryModal = !this.showCategoryModal
    }

    toggleTagModal() {
        this.showTagModal = !this.showTagModal
    }

    toggleCountryModal() {
        this.showCountryModal = !this.showCountryModal
    }

    setShopCategory(categoryId) {
        let shopCategories = this.shop.categories
        let categoryNumber = 0
        // we check how many Main Categories the shop is set in
        if (shopCategories.length > 0) {
            let parentCategories = this.categories.filter(category => { return category.type === "category" })
            shopCategories.map((shopTagId) => {
                parentCategories.map((parentCategory) => {
                    if (parentCategory._id === shopTagId) {
                        categoryNumber += 1
                    }
                })
            })
        }

        if (categoryNumber >= 2) {
            return this.toastManager.error('Puedes elegir hasta 2 categorías')
        }
        this.shopService.setShopCategory(categoryId, this.shop._id)
            .then(result => {
                this.shop.categories = result.categories
                this._getCurrentCategory(result, this.categories)
            })
    }

    resetShopCategory(categoryId) {
        this.shopService.resetShopCategory(categoryId, this.shop._id)
            .then(result => {
                this.shop.categories = result.categories
                this._getCurrentCategory(result, this.categories)
            })
    }

    setShopSubcategory(categoryId, subcategoryId) {
      let shopCategories = this.shop.categories
      let categoryNumber = 0
      let parentCategories = this.categories.filter(category => { return category.type === "category" })
      // we check how many Main Categories the shop is set in
      if (shopCategories.length > 0) {
          shopCategories.map((shopTagId) => {
              parentCategories.map((parentCategory) => {
                  if (parentCategory._id === shopTagId) {
                      categoryNumber += 1
                  }
              })
          })
      }

      if (categoryNumber >= 2 && shopCategories.indexOf(categoryId) === -1) {
          return this.toastManager.error('Puedes elegir hasta 2 categorías')
      }
        this.shopService.setShopSubcategory(categoryId, subcategoryId, this.shop._id)
            .then(result => {
                this.shop.categories = result.categories
                this._getCurrentCategory(result, this.categories)
            })
    }

    tagShop(tagId) {
        this.shopService.tagShop(tagId, this.shop._id)
            .then(result => {
                this.shop.tags = result.tags
                this._getCurrentTags(this.tags, this.shop)
            })
    }

    untagShop(tagId) {
        this.shopService.untagShop(tagId, this.shop._id)
            .then(result => {
                this.shop.tags = result.tags
                this._getCurrentTags(this.tags, this.shop)
            })
    }

    _getCurrentCategory(shop, categories) {
        let shopCategories = shop.categories
        let currentCategories = ""
        shopCategories.map((catId) => {
            categories.map((cat) => {
                if (cat._id === catId) {
                    currentCategories += " " + cat.categoryName
                }
            })
        })
        this.currentCategories = currentCategories
    }

    _getCurrentTags(tags, shop) {
        let shopTags = shop.tags
        let tagsPlaceholder = ""
        if (shopTags.length > 0) {
            shopTags.map((tagId) => {
                tags.map((tag) => {
                    if (tag._id === tagId) {
                        tagsPlaceholder += tag.tagName + ", "
                    }
                })
            })
        }
        if (tagsPlaceholder === "") {
            tagsPlaceholder = 'tags ...'
        }
        this.shopTagsPlaceholder = tagsPlaceholder;
    }

}
