import { NgModule } from '@angular/core';
import '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from "firebase/app";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';


import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DialogComponent } from './login/dialog/dialog.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RollingComponent } from './rolling/rolling.component';
import { ProfileComponent } from './profile/profile.component';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoE1OYr3nFGmJ5Klltg7YF_qvwDjuto44",
  authDomain: "secretcenter-d8492.firebaseapp.com",
  projectId: "secretcenter-d8492",
  storageBucket: "secretcenter-d8492.appspot.com",
  messagingSenderId: "230321078185",
  appId: "1:230321078185:web:1558ef992180c0f9f6ceb8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNavComponent,
    DialogComponent,
    WishlistComponent,
    RollingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AgGridModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
