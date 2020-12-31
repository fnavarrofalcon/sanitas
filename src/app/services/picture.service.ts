import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Picture } from '../models/picture';
import faker from 'faker';

@Injectable({
    providedIn: 'root'
})
export class PictureService {

    public picture$: Picture[];

    constructor() { }

    public getPictures(): Observable<Picture[]>{
        this.getMockPictures();
        return of(this.picture$);
    }

    private getMockPictures() {
        this.picture$ = [];
        for (let index = 0; index < 4000; index++) {
            let picture = new Picture();
            picture.id = index;
            picture.photo = `https://picsum.photos/id/${index}/500/500.jpg`;
            picture.text = faker.random.words();
            this.picture$.push(picture);
        }
        return this.picture$;
    }
}
