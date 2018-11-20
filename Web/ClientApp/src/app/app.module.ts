import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './restaurant/designer/layout/layout.component'
import { LayoutService } from './services/layout.service';
import { DesignerComponent } from './restaurant/designer/designer/designer.component';
import { DesignerNavComponent } from './restaurant/designer/designer-nav/designer-nav.component';
import { TableEditorComponent } from './restaurant/designer/table-editor/table-editor.component';
import { LayoutEditorComponent } from './restaurant/designer/layout-editor/layout-editor.component';
import { TableLinkEditorComponent } from './restaurant/designer/table-link-editor/table-link-editor.component';
import { SaveStateService } from './services/save-state.service';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { RestaurantNavComponent } from './restaurant/restaurant-nav/restaurant-nav.component';
import { AnalyticsComponent } from './restaurant/analytics/analytics/analytics.component';
import { FohComponent } from './restaurant/foh/foh/foh.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    RestaurantComponent,
    RestaurantNavComponent,
    AnalyticsComponent,
    FohComponent,
    DesignerComponent,    
    DesignerNavComponent,
    LayoutComponent,
    TableEditorComponent,
    LayoutEditorComponent,
    TableLinkEditorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'foh', component: FohComponent },
      { path: 'designer', component: DesignerComponent }
    ])
  ],
  providers: [LayoutService, SaveStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
