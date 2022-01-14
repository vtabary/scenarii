import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/**
 * From https://stackoverflow.com/a/48714721
 */
export const atLeastOneOf =
  (validator: ValidatorFn, controlNames?: string[]) =>
  (group: FormGroup): ValidationErrors | null => {
    if (!controlNames) {
      controlNames = Object.keys(group.controls);
    }

    const hasAtLeastOne =
      group &&
      group.controls &&
      controlNames.some((k) => !validator(group.controls[k]));

    return hasAtLeastOne
      ? null
      : {
          atLeastOneOf: true,
        };
  };

/**
 * From https://stackoverflow.com/a/48714721
 */
export const onlyOneOf =
  (validator: ValidatorFn, controlNames?: string[]) =>
  (group: FormGroup): ValidationErrors | null => {
    if (!controlNames) {
      controlNames = Object.keys(group.controls);
    }

    const hasMoreThanOne =
      group &&
      group.controls &&
      controlNames.filter((k) => !validator(group.controls[k])).length > 1;

    return !hasMoreThanOne
      ? null
      : {
          onlyOneOf: true,
        };
  };

export const requiredFileType = (types: string[] = []) => {
  types = types.map((type) => type.toLocaleLowerCase());

  return (control: FormControl): ValidationErrors | null => {
    const file: File = control.value;

    if (types.length === 0 || !file) {
      return null;
    }

    return types.includes(file.type.toLocaleLowerCase())
      ? null
      : { requiredFileType: true };
  };
};
