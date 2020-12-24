import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../models/picture';

@Pipe({
    name: 'searchPicture'
})
export class SearchPicturePipe implements PipeTransform {

    transform(value, filterValue, filterType): Picture[] {
        let result: Picture[] = [];
        if (!filterValue) {
            return value;
        } else {
            switch (filterType) {
                case 'ID':
                    result.push(value.find((picture: Picture) => {
                        return picture.id.toString() === filterValue;
                    }));
                    break;
                case 'TEXT':
                    result = value.filter((picture: Picture) => {
                        return picture.text.includes(filterValue);
                    });
                    break;
                default:
                    break;
            }
            return result;
        }
        
    }

}
