import { FormControl } from "@angular/forms";
import { TestFormControlName } from "src/form-control-names/test-form-control-name.enum";
import { TestFormControlType } from "src/types/test-form";

export interface ITestForm extends TestFormControlType {
  [TestFormControlName.FIRST_NAME]: FormControl<string>;
  [TestFormControlName.LAST_NAME]: FormControl<string>;
  [TestFormControlName.EMAIL_ADDRESS]: FormControl<string>;
  [TestFormControlName.PASSWORD]: FormControl<string>;
  [TestFormControlName.DATE_OF_BIRTH]: FormControl<Date>;
  [TestFormControlName.ADULT_CONTENT]?: FormControl<boolean>;
}
