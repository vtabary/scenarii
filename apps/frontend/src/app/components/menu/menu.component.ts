import { Component } from '@angular/core';
import {
  faFileImport,
  faQuestionCircle,
  faChartBar,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { ScenariosRegistryService } from '../../modules/shared/public-api';

@Component({
  selector: 'scenarii-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  public faFileImport = faFileImport;
  public faPlay = faPlay;
  public faQuestionCircle = faQuestionCircle;
  public faChartBar = faChartBar;
  public isRunning$: Observable<boolean>;

  constructor(registry: ScenariosRegistryService) {
    this.isRunning$ = registry.registryUpdated.pipe(
      map((items) => items.length > 0)
    );
  }
}
