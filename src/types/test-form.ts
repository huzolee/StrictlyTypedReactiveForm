import { FormControl } from "@angular/forms";
import { TestFormControlName } from "src/form-control-names/test-form-control-name.enum";

export type TestFormType = Partial<Record<TestFormControlName, FormControl<unknown>>>;
