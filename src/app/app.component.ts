import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  active = 1;
  searched = false;
  mostraDettaglio = false;
  APPS: string[] = [
    'Rimborsi',
    'Regimi Speciali',
    'Domiciliazioni',
    'Memorie Difensive',
    'Rateizzazioni',
  ];

  selectedApps: string[] = [];

  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  form: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      apps: new FormControl(null, []),
      periodoDal: new FormControl('2022-01', [Validators.required]),
      periodoAl: new FormControl('2022-12', [Validators.required]),
    });

    this.selectedApps = this.APPS;
    this.APPS = [];
    this.submit();
  }

  selectApp($event: any) {
    $event.preventDefault();
    this.selectedApps.push($event.item);
    this.APPS = this.APPS.filter((v) => v !== $event.item);
    this.form.controls.apps.patchValue(null);
  }

  removeApp(value: string) {
    this.selectedApps = this.selectedApps.filter((v) => v !== value);
    this.APPS.push(value);
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.APPS
          : this.APPS.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  submit() {
    console.log(this.form.value);
    this.searched = true;
  }

  dettaglio() {
    this.mostraDettaglio = true;
  }
}
