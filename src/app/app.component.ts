import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FoodsRestService} from './rest.service.ts/foods-rest.service';
import {catchError, take} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule],
    providers: [FoodsRestService],
    templateUrl: './app.component.html'
})
export class AppComponent {

    foodsRestService = inject(FoodsRestService);

    getByIdResponse: string = '';

    getAllResponse: string = '';

    getElementById(id: number) {
        this.foodsRestService.getElementById(id).pipe(
            take(1),
            catchError(err => {
                alert(err.status? `Error ${err.status}: ${err.statusText}` : 'Server response: error');
                this.getByIdResponse = JSON.stringify(err);
                throw err;
            })
        )
            .subscribe(res => {
            this.getByIdResponse = JSON.stringify(res);
        });
    }

    getElements() {
        this.foodsRestService.getElements().pipe(
            take(1),
            catchError(err => {
                alert(err.status? `Error ${err.status}: ${err.statusText}` : 'Server response: error');
                this.getAllResponse = JSON.stringify(err);
                throw err;
            })
        )
            .subscribe(res => {
            this.getAllResponse = JSON.stringify(res);
        });
    }

    deleteElementById() {}

    updateElementById(id: number) {
        this.foodsRestService.putElement(id).pipe(
            take(1),
            catchError(err => {
                alert(err.status? `Error ${err.status}: ${err.statusText}` : 'Server response: error');
                this.getByIdResponse = JSON.stringify(err);
                throw err;
            })
        )
            .subscribe(res => {
            this.getByIdResponse = JSON.stringify(res);
        });}

    createElement() {}
}
