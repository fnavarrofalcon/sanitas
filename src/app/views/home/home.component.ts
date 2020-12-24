import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    pictures: Picture[];

    constructor(private pictureService: PictureService) { }

    ngOnInit(): void {
        this.pictures = this.pictureService.getPictures();
    }

}
