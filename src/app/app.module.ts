import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MatStepperModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FormsModule,
    NgFallimgModule.forRoot({
      default: '/assets/img/Cursos/sin_imagen.jpg',
      avatar: '/assets/img/Profesionales/avatar.jpg'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
