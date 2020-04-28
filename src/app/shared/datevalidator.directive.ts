import { Validator, AbstractControl, ValidationErrors} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector:'[startDateValidator]',
       
})
export class DateValidator implements Validator{
    validate(control: AbstractControl): ValidationErrors | null{
        //control.value
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
    
}