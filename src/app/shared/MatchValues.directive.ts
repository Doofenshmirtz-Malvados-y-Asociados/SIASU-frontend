import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValues(inputToMatch: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control.parent as FormGroup;
        const controlToMatch = formGroup?.get(inputToMatch);

        if (!controlToMatch || control.value !== controlToMatch.value) {
            return { mismatch: false };
        }

        return null;
    };
}