import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';
import { PictureService } from 'src/app/services/picture.service';

@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

    @Input() picturesData: Picture[];
    private countIndex: number = 0
    private finishPage: number;
    private actualPage: number = 1;
    private picturePerPage: number = 12;
    public picturesAmount: Picture[] = [];
    public showGoUpButton: boolean = false;
    public showScrollHeight: number = 400;
    public hideScrollHeight: number = 200;
    public filterValue: string;
    public filterType: string;

    constructor(private pictureService: PictureService) { }

    ngOnInit() {
        this.finishPage = this.calculateFinishPage(
            this.picturesData.length,
            this.picturePerPage
        );
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
            this.picturesAmount.push(this.picturesData[this.countIndex]);
            this.countIndex++;
        }
    }

    public onScroll() {
        if (this.actualPage < this.finishPage) {
            this.addPicturesPerPage();
            this.actualPage++;
        } else {
            console.log('No more lines. Finish page!');
        }
    }

    private calculateFinishPage(items: number, itemsPerPage: number): number {
        if (items % itemsPerPage === 0) {
            return items / itemsPerPage;
        } else {
            return Math.floor(items / itemsPerPage) + (items % itemsPerPage);
        }
    }

    public search(event) {
        this.filterValue = event.target.value;
    }

    public scrollTop() {
        document.body.scrollTop = 0; // Safari
        document.documentElement.scrollTop = 0; // Other
    }

}
