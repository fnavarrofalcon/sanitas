import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Picture, Pictures } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';

@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

    @Input() picturesData: Array<Picture>;
    private countIndex = 0
    private finishPage;
    private actualPage: number;
    private picturePerPage = 12;
    public showGoUpButton: boolean;
    public showScrollHeight = 400;
    public hideScrollHeight = 200;
    public filterValue;
    public filterType;

    constructor(private pictureService: PictureService) {
        this.actualPage = 1;
        this.showGoUpButton = false;
    }

    ngOnInit() {
        this.finishPage = this.calculateFinishPage(
            this.pictureService.getPicturesLength(), 
            this.picturePerPage
        );
        console.log(this.finishPage);
        this.picturesData = new Array<Picture>();
        this.addPicturesPerPage();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if ((window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop) > this.showScrollHeight) {
            this.showGoUpButton = true;
        } else if (this.showGoUpButton &&
            (window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop)
            < this.hideScrollHeight) {
            this.showGoUpButton = false;
        }
    }

    private addPicturesPerPage() {
        for (let i = 0; i < this.picturePerPage; i++) {
            this.picturesData.push(this.pictureService.getPicturesByIndex(this.countIndex));
            this.countIndex++;
        }
    }

    public onScroll() {
        if (this.actualPage < this.finishPage) {
            this.addPicturesPerPage();
            this.actualPage ++;
        } else {
            console.log('No more lines. Finish page!');
        }
    }

    private calculateFinishPage(items: number, itemsPerPage: number): number {
        if (items % itemsPerPage === 0) {
            return items / itemsPerPage;
        } else {
            return Math.floor(items/itemsPerPage) + (items % itemsPerPage);
        }
    }

    public searchById(event, type) {
        this.filterValue = event.target.value;
        this.filterType = type;
    }

    public searchByText(event, type) {
        this.filterValue = event.target.value;
        this.filterType = type;
    }

    public scrollTop() {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Other
      }

}
