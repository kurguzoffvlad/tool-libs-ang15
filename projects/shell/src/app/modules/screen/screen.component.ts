import {Component, inject} from '@angular/core';

import { map } from 'rxjs/operators';

// import {ToolScreenService} from "tool-screen-ang15";
import { ToolScreenService } from '../../../../../tool-screen-ang15/src/lib/services/tool-screen.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent {
    public readonly screen = inject(ToolScreenService);

    public readonly boxClass$ = this.screen.state$.pipe(
        map(s => ({
            [`type-${s.screen.type ?? 'unknown'}`]: true,
            [`orientation-${s.screen.orientation ?? 'unknown'}`]: true,
        })),
    );

    public shrink(): void {
        this.screen.setDevices({ phoneMaxSize: 800 });
    }

    public refresh(): void {
        this.screen.refresh();
    }
    // destroy() НЕ вызываем — сервис root-scoped
}
