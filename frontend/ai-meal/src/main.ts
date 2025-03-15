import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),  // ✅ Enable fetch for HTTP requests
    provideRouter(routes)  // ✅ Add routing support
  ]
}).catch(err => console.error(err));
