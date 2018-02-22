import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'contactFilter'
})
export class ContactListFilterPipe implements PipeTransform {
    transform(items: Array<any>, filter : string): any {
        if (!filter) {
            return items;
        }
        return items.filter(item => item.name.match(new RegExp(filter, 'i')));
    }
}
