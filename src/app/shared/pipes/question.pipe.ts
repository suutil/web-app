import {Pipe, PipeTransform} from '@angular/core';
import { FaqQuestion } from 'app/shared/shared.module';

@Pipe({
    name: 'questionFilter'
})
export class QuestionFilterPipe implements PipeTransform {
    transform(items: Array<FaqQuestion>, filter : string): any {
        if (!filter) {
            return items;
        }
        return items.filter(item => item.answer.match(new RegExp(filter,'i')) || item.question.match(new RegExp(filter,'i')));
    }
}
