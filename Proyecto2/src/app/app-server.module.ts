import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalInterceptor } from './universal-interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true /* Multi is important or you will delete all the other interceptors */
  }],
  bootstrap: [AppComponent]
})
export class AppServerModule {}