import {Component} from '@angular/core';
import {ToolConfigToLibAng15Service} from "tool-config-to-lib-ang15";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
    public apiUrl = this.lib.doSomething();

    constructor(private lib: ToolConfigToLibAng15Service) {}
}
