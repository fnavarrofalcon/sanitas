import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../models/picture';

@Pipe({
    name: 'searchPicture'
})
export class SearchPicturePipe implements PipeTransform {

    transform(value, filterValue, valueComplete): Picture[] {
        let result: Picture[] = [];
        if (!filterValue) {
            return value;
        } else {
            result = valueComplete.filter((picture: Picture) => {
                return picture.text.toLowerCase().includes(filterValue.toLowerCase()) || picture.id.toString() === filterValue;
            });
            return result;
        }
        
    }

}
