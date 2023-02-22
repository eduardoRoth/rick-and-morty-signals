import { RouterModule } from '@angular/router';
import {
  Component,
  EnvironmentInjector,
  importProvidersFrom,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [RouterModule, IonicModule],
  selector: 'signals-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public environmentInjector: EnvironmentInjector) {}
}
