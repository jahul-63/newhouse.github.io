import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { FeaturesComponent } from './features/features.component';
import { PropertyComponent } from './property/property.component';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';
import { AuthServiceConfig} from 'angularx-social-login';
import { SocialLoginModule , GoogleLoginProvider , FacebookLoginProvider} from 'angularx-social-login';
import { DetailComponent } from './detail/detail.component';

const config = new AuthServiceConfig([
  {
    id : GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('295867526286-06c53e2vavtji481udllj47bbo3u5p01.apps.googleusercontent.com')
  },
  {
     id : FacebookLoginProvider.PROVIDER_ID,
     provider:new FacebookLoginProvider('3501319223238121')
  }
]);

export function provideConfig(){
  return config;

}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContactComponent,
    BlogComponent,
    FeaturesComponent,
    PropertyComponent,
    ServiceComponent,
    AboutComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDbXQ3szktHF5cZsJzZytyxb_wNAhbWmkY'}),
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide : AuthServiceConfig,
      useFactory : provideConfig 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
