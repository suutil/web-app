import { SearchInputComponent } from './atoms/search-input/search-input.component';
import { ViewPanelComponent } from './atoms/view-panel/view-panel.component';
import { PanelComponent } from './atoms/panel/panel.component';

import { UploadFormComponent } from './molecules/upload-form/upload-form.component';
import { LandingContentComponent } from './molecules/landing-content/landing-content.component';
import { ShopFilterComponent } from './molecules/shop-filter/shop-filter.component';
import { LoginFormComponent } from './molecules/login-form/login-form.component';
import { DesignerSignupFormComponent } from './molecules/designer-signup-form/designer-signup-form.component';
import { ProviderSignupFormComponent } from './molecules/provider-signup-form/provider-signup-form.component';
import { CreateShopComponent } from './molecules/create-shop/create-shop.component';
import { FooterComponent } from './molecules/footer/footer.component';
import { ShopComponent } from './molecules/shop/shop.component';
import { CookieMessageComponent } from './molecules/cookie-message/cookie-message.component';
import { CreateTagComponent } from './molecules/create-tag/create-tag.component';
import { BlogManagementComponent } from './molecules/blog-management/blog-management.component';
import { EditPostModal } from './molecules/blog-management/components/edit-post-modal.component';
import { EditTagModal } from './molecules/create-tag/components/edit-tag-modal.component';
import { LandingManagementComponent } from './molecules/landing-management/landing-management.component';
import { ResetPasswordFormComponent} from './molecules/reset-password-form/reset-password-form.component';
import { BlogAccessModal } from './molecules/landing-content/components/blog-access-modal.component';
import { TagInputModule } from 'ng2-tag-input'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { QuestionFilterPipe } from 'app/shared/pipes/question.pipe';
import { DatePipe } from '@angular/common';
import { ImageUploadModule } from 'ng2-imageupload'
import { ImageToDataUrlModule } from "ngx-image2dataurl";
import { TinymceModule } from 'angular2-tinymce';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MultiselectDropdownModule,
        ImageUploadModule,
        ImageToDataUrlModule,
        TagInputModule,
        //BrowserAnimationsModule,
        NguiAutoCompleteModule,
        TinymceModule.withConfig({
          toolbar: false
        //['undo','reset-password-form','bold','italic','underline','strikethrough','code','styleselect']
        })
    ],
    exports: [
        PanelComponent,
        ViewPanelComponent,
        SearchInputComponent,

        UploadFormComponent,
        ShopFilterComponent,
        LandingContentComponent,
        LoginFormComponent,
        DesignerSignupFormComponent,
        ProviderSignupFormComponent,
        FooterComponent,
        CreateShopComponent,
        ShopComponent,
        CreateTagComponent,
        CookieMessageComponent,
        BlogManagementComponent,
        LandingManagementComponent,
        ResetPasswordFormComponent
    ],
    declarations: [
        PanelComponent,
        ViewPanelComponent,
        QuestionFilterPipe,
        SearchInputComponent,

        UploadFormComponent,
        ShopFilterComponent,
        LandingContentComponent,
        LoginFormComponent,
        DesignerSignupFormComponent,
        ProviderSignupFormComponent,
        FooterComponent,
        CreateShopComponent,
        ShopComponent,
        CreateTagComponent,
        CookieMessageComponent,
        BlogManagementComponent,
        EditPostModal,
        EditTagModal,
        LandingManagementComponent,
        ResetPasswordFormComponent,
        BlogAccessModal
    ],
    providers: [
        ImageUploadModule,
        ImageToDataUrlModule
    ],
    entryComponents: [ EditPostModal, EditTagModal, BlogAccessModal  ]
})
export class UIModule { }
