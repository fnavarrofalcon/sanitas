import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public pictures: Picture[];

    constructor(private pictureService: PictureService) { }

    ngOnInit(): void {
        this.pictureService.getPictures().subscribe(res => {
            this.pictures = res;
        });
    }

}
