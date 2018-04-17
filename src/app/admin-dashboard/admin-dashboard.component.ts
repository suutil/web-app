import { Component, Input, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr'
import { LoginService } from 'app/shared/services/login.service'
import { UserManagementService } from '../shared/services/user-management.service';
import { EditUserModal } from './components/edit-user-modal.component';
import { EditShopModal } from './components/edit-shop-modal.component';
import { UiModalService } from 'app/ui-modal/ui-modal.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'app/shared/services/shop.service'


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.html'
})
export class AdminDashboardComponent {
private categories : any
showShopFilter = true
view : string = 'user-management'
blogPosts :any

settings = {
  actions : {
    edit : false,
    add : false,
    delete : false,
    custom: [
        {
          name: 'edit',
          title: 'Editar',
        }
      ]
  },



  columns: {
    firstName: {
      title: 'Nombre'
    },
    email: {
      title: 'Correo'
    },
    company: {
      title: 'Tienda'
    },
    rol: {
      title: 'Actividad'
    },
    applicationUrl: {
      title: 'Web'
    }
  }
};

shopSettings = {
  actions : {
    edit : false,
    add : false,
    delete : false,
    custom: [
        {
          name: 'edit',
          title: 'Editar',
        }
      ]
  },



  columns: {
    approved: {
      title: 'activa'
    },
    shopName: {
      title: 'Nombre de la tienda'
    },
    contactMail: {
      title: 'Correo de contacto'
    },
    _id : {
      title: 'ID'
    }
  }
};

data: any
shops: any



  constructor(private userManagementService: UserManagementService,
              private toastManager: ToastsManager,
              private route: ActivatedRoute,
              private uiModalService: UiModalService,
              private shopService: ShopService) {

  }

  ngOnInit(){
    this.route.data.subscribe(data => {
        this.categories =  data['categories']
        this.blogPosts = data['posts']
    })
    this.userManagementService.getDataResources()
    .then(datas=> {
      this.data = datas
    })
    this.shopService.getShops()
    .then((shops)=>{
      this.shops = shops
    })
  }

  onCustom(event) {
    this.uiModalService.openModal(EditUserModal, { user: event.data}, 'Activar usuario', 'Guardar')
}
  editShopModal(event){
    this.uiModalService.openModal(EditShopModal, { shop: event.data}, 'Activar usuario', 'Guardar')
  }

  setView(view){
    this.view = view
  }


}
