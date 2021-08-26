import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage'; //storage
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFallimgModule } from 'ng-fallimg'
import { AuthService } from './services/auth.service';
import { CursosService } from './services/cursos.service';
import { DocentesService } from './services/docentes.service';
import { EtiquetaService } from './services/etiqueta.service';
import { LoginService } from './services/login.service';
import { MembresiaService } from './services/membresia.service';
import { PreguntaService } from './services/pregunta.service';
import { RegistroService } from './services/registro.service';
import { SolicitudesCompraService } from './services/solicitudes-compra.service';
import { UsuarioService } from './services/usuario.service';
import { EvaluacionService } from './services/evaluacion.service';
//...
import { CursoModule } from './pages/curso/curso.module';
import { DocenteModule } from './pages/docente/docente.module';
import { EstudianteModule } from './pages/estudiante/estudiante.module';
import { InicioModule } from './pages/inicio/inicio.module';
import { LandingModule } from './pages/landing/landing.module';
import { PagesAdminModule } from './pages-admin/pages-admin.module';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { ComponentsModule } from './components/components.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
//FACEBBOK MODULE
import { FacebookModule } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent
  ],
  imports: [
    CarouselModule,
    BrowserModule,
    RouterModule,
    FacebookModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    PagesAdminModule,
    CursoModule,
    DocenteModule,
    EstudianteModule,
    InicioModule,
    LandingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, //storage
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    FormsModule,
    NgFallimgModule.forRoot({
      default: 'https://firebasestorage.googleapis.com/v0/b/lms-academia-a582f.appspot.com/o/images%2Fsin_imagen.png?alt=media&token=4d298c8f-b583-49da-909b-c490deef31f7',
      avatar: 'https://firebasestorage.googleapis.com/v0/b/lms-academia-a582f.appspot.com/o/images%2Favatar.jpg?alt=media&token=2efe842e-f75e-4445-af7e-caee25e119c9'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  },
    AuthService,
    CursosService,
    DocentesService,
    EtiquetaService,
    LoginService,
    MembresiaService,
    PreguntaService,
    RegistroService,
    SolicitudesCompraService,
    UsuarioService,
    EvaluacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
