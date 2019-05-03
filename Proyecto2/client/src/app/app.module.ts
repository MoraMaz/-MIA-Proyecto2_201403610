import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoMaterialModule } from './material-module';

import { DetailsProductComponent } from './components/details-product/details-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

import { DataApiService } from './services/data-api.service';

import { TruncateTextPipe } from './pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    TruncateTextPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DemoMaterialModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
