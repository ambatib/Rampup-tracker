import { FormGroup } from '@angular/forms';




export class DateValidator {
    static dateLessThan(startDate: string, endDate: string) {
        return (group: FormGroup): {[key: string]: any} => {
        const f = group.controls[startDate];
        const t = group.controls[endDate];
        if (f.value > t.value) {
            return {
            dates: 'Start date should be less than End date'
            };
        }
        return {};
        };
    }
    static dateGreaterThan(startDate: string, currentDate: string) {
        return (group: FormGroup): {[key: string]: any} => {
        const f = group.controls[startDate];
        const t = group.controls[currentDate];
        if (f.value < t.value) {
            return {
            dates: 'Start date should not be less than current date.'
            };
        }
        return {};
        };
    }
}
