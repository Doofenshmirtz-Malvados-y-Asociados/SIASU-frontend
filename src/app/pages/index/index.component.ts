import { Component } from '@angular/core';
import { GlowyButtonComponent } from "../../components/glowy-button/glowy-button.component";

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [GlowyButtonComponent]
})
export class IndexComponent {

}
