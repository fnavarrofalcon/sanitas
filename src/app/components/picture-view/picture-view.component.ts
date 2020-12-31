import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';

@Component({
    selector: 'app-picture-view',
    templateUrl: './picture-view.component.html',
    styleUrls: ['./picture-view.component.scss']
})
export class PictureViewComponent implements OnInit {

    @Input() picture: Picture;

    constructor() { }

    ngOnInit(): void {
        console.log(this.picture);
        
    }

}
