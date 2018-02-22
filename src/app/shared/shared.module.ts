import { ObjectivesService } from './services/objectives.service';
import { WorkerService } from './services/worker.service';
import { InfoService } from './services/info.service';
import { ContabilityService } from './services/contability.service';
import { SetPasswordService } from './services/set-password.service';
import { UserManagementService } from './services/user-management.service';
import { AlertsService } from './services/alerts.service';
import { UploadPictureService } from './services/upload-picture.service';
import { ShopService } from './services/shop.service';
import { ContentService } from './services/content.service';
import { ConfirmationService } from './services/confirmation.service';

import { DocumentationService } from './services/documentation.service';
import { CustomerService } from './services/customer.service';
import { DataMockService } from './services/api/data-mock.service';
import { TaxesService } from './services/taxes.service';
import { FeathersDataResourceService } from './services/api/data-resoucers-feathers.service';
import { DataResource } from './data-resources.interface';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { FaqQuestion } from 'app/shared/models/FaqQuestion.model';

import { AuthenticationService } from 'app/shared/authentication.service'

import { APIService } from 'app/shared/services/api/api.service'
import { UsersService } from 'app/shared/services/api/users.service'
import { LoginService } from 'app/shared/services/login.service'
import { QuestionsService } from 'app/shared/services/questions.service'

import { CoreModule } from 'app/core/core.module'

import { Ng2PageTransition } from 'app/shared/components/ng2-page-transition/ng2-page-transition.component'

@NgModule({
  declarations: [
    Ng2PageTransition
  ],
  imports: [
    FormsModule,
    RouterModule,
    CoreModule
  ],
  providers: [
    AuthenticationService,
    LoginService,
    APIService,
    UsersService,
    TaxesService,
    CustomerService,
    DocumentationService,
    AlertsService,
    UserManagementService,
    SetPasswordService,
    FeathersDataResourceService,
    DataMockService,
    QuestionsService,
    InfoService,
    ContabilityService,
    WorkerService,
    ObjectivesService,
    UploadPictureService,
    ShopService,
    ContentService,
    ConfirmationService
  ],
  exports: [
    RouterModule,
    FormsModule,
    Ng2PageTransition,
  ]
})

export class SharedModule { }

// Models
export { FaqQuestion }
