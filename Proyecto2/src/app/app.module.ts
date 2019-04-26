import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoMaterialModule } from './material-module';
import { EmbedVideo } from 'ngx-embed-video';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ImageUploadModule } from 'angular2-image-upload';

import { DashboardComponent } from './services/dashboard.component';
import { HeaderComponent } from './core/shell/header/header.component';
import { HeroesComponent } from './services/heroes.component';
import { HeroDetailComponent } from './services/hero-detail.component';
import { HeroSearchComponent }  from './services/hero-search.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { LoginComponent } from './core/login/login.component';
import { MainComponent } from './main/main.component';
import { MessagesComponent } from './services/messages.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { SingUpComponent } from './core/sing-up/sing-up.component';
import { TestService } from './connection/services/test.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    LoginComponent,
    MainComponent,
    MessagesComponent,
    NotFoundComponent,
    SingUpComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'universal' }),
    BrowserModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    DemoMaterialModule,
    EmbedVideo.forRoot(),
    FormsModule,
    HttpClientModule,
    ImageUploadModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [ TestService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
