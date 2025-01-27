import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FoodsRestService {

    httpService = inject(HttpClient);

    getElementById(id: number) {
        return this.httpService.get(`http://localhost:3344/foods/${id}`);
    }

    getElements() {
        return this.httpService.get('http://localhost:3344/foods');
    }

    putElement(id: number) {
        return this.httpService.get('http://localhost:3344/foods');
    }

    postElement() {
        return this.httpService.get('http://localhost:3344/foods');
    }

    deleteElement(id: number) {
        return this.httpService.get('http://localhost:3344/foods');
    }
}
