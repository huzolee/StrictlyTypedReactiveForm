import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { TestFormControlName } from "src/form-control-names/test-form-control-name.enum";
import { ITestForm } from "src/interfaces/i-test-form";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private static readonly DEFAULT_VALUE_STRING: string = "";
  private static readonly DEFAULT_VALUE_DATE: Date | null = null;
  private static readonly AGE_CHECK_VALUE: number = 18;
  private static readonly NUMBER_OF_MS_IN_YEAR: number = 31536000000;
  private subscription: Subscription = new Subscription();

  public TestFormControlName = TestFormControlName;
  public form!: FormGroup<ITestForm>;
  public age!: number;

  get adult(): boolean {
    return this.age > AppComponent.AGE_CHECK_VALUE;
  }

  get dateOfBirthController(): FormControl<Date> {
    return <FormControl<Date>>this.form.get(TestFormControlName.DATE_OF_BIRTH);
  }

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup<ITestForm>({
      [TestFormControlName.FIRST_NAME]: new FormControl<string>(AppComponent.DEFAULT_VALUE_STRING, {
        nonNullable: true,
        validators: Validators.required,
      }),
      [TestFormControlName.LAST_NAME]: new FormControl<string>(AppComponent.DEFAULT_VALUE_STRING, {
        nonNullable: true,
        validators: Validators.required,
      }),
      [TestFormControlName.EMAIL_ADDRESS]: new FormControl<string>(
        AppComponent.DEFAULT_VALUE_STRING,
        {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }
      ),
      [TestFormControlName.PASSWORD]: new FormControl<string>(AppComponent.DEFAULT_VALUE_STRING, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [TestFormControlName.DATE_OF_BIRTH]: new FormControl<Date>(AppComponent.DEFAULT_VALUE_DATE!, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });

    this.subscription.add(
      this.dateOfBirthController.valueChanges.subscribe((selectedDate: Date) => {
        const diffInMs: number = Math.abs(Date.now() - selectedDate.getTime());
        this.age = diffInMs / AppComponent.NUMBER_OF_MS_IN_YEAR;

        if (this.adult) {
          this.form.addControl(
            TestFormControlName.ADULT_CONTENT,
            new FormControl(false, {
              nonNullable: true,
            })
          );
        } else {
          this.form.removeControl(TestFormControlName.ADULT_CONTENT);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public send(): void {
    if (!this.form.invalid) {
      console.log("form values", this.form.getRawValue());
    } else {
      console.log("not all the required fields filled");
    }
  }
}
