import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from 'app/shared/services/shop.service'
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from '@angular/router';


@Component({
    selector: 'shop-filter',
    templateUrl: './shop-filter.html'
})
export class ShopFilterComponent {
@Input() categories
@Input() tags
showCat = []
categoryDatas: any
showCategoryMenu: boolean = false
showOtherMenu: boolean = false
bannerUrl: string = "https://suutil-images.s3.eu-central-1.amazonaws.com/1.filter-banner"
constructor(private shopService: ShopService,
            private router: Router,
            private _sanitizer: DomSanitizer) {}

ngOnInit(){
  this.categoryDatas = this.shopService.buildCategoryDatas(this.categories)
}

valueChanged(newVal) {
  if(newVal._id){
    this.router.navigate(["shops/tag", newVal._id])
  }
}

toggleCategoryMenu(){
  console.log(this.showCategoryMenu)
  this.showCategoryMenu = !this.showCategoryMenu
}

toggleOtherMenu(){
  this.showOtherMenu = !this.showOtherMenu
}



collapse(cat){
  if(!this.showCat[cat]){
    this.showCat = [];
    this.showCat[cat] = true
  }
  else {
    this.showCat = [];
  }
}

}
