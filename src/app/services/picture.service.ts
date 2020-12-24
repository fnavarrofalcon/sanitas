import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture, Pictures } from '../models/picture';

@Injectable({
    providedIn: 'root'
})
export class PictureService {

    public data: Picture[] = [];

    constructor() { }

    public getPictures(): Picture[] {
        this.getMockPictures();
        return this.data;
    }

    public getPicturesLength(): number {
        return this.data.length;
    }

    public getPicturesByIndex(index: number): Picture {
        return this.data[index];
    }

    private getMockPictures() {
        for (let index = 0; index < 4000; index++) {
            let picture = new Picture();
            picture.id = index;
            picture.photo = `https://picsum.photos/id/${index}/200/200.jpg`
            picture.text = `a ramdon text over photo with id ${index}`
            this.data.push(picture);
        }
    }
}
