import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  Observable,
  OperatorFunction,
  Subject,
  merge,
  BehaviorSubject,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { App, APPS } from 'src/app/models/app';

@Component({
  selector: 'app-filtri',
  templateUrl: './filtri.component.html',
  styleUrls: ['./filtri.component.scss'],
})
export class FiltriComponent implements OnInit {
  @Output() emitSearch: BehaviorSubject<any> = new BehaviorSubject(null);
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  showFilter: boolean = true;

  form: FormGroup;
  searched = false;
  mostraDettaglio = false;
  APPS: App[] = APPS;

  selectedApps: App[] = [];

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      apps: this._formBuilder.control(null, []),
      periodoDal: this._formBuilder.control('2022-01', [Validators.required]),
      periodoAl: this._formBuilder.control('2022-12', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  selectApp($event: any) {
    $event.preventDefault();
    const app: App = $event.item;
    this.selectedApps.push(app);
    this.APPS = this.APPS.filter((v) => v !== app);
    this.form.addControl(
      app.label,
      this._formBuilder.group(this.getControlsApp(app))
    );
  }

  getControlsApp(app: App) {
    let stati: {
      [key: string]: any;
    } = {};
    app.stati.forEach((stato) => {
      stati[`stato_${stato.id}`] = this._formBuilder.control(true, []);
    });
    return stati;
  }

  removeApp(app: App) {
    this.selectedApps = this.selectedApps.filter((v) => v !== app);
    this.APPS.push(app);
    if (this.selectedApps.length === 0) this.searched = false;
    this.form.removeControl(app.label);
  }

  formatter = (app: App) => app.label.toUpperCase();

  search: OperatorFunction<string, readonly App[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => this.instance && !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => {
        return (
          term === ''
            ? this.APPS
            : this.APPS.filter(
                (v) => v.label.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
        ).slice(0, 10);
      })
    );
  };

  submit() {
    this.emitSearch.next({
      form: this.form.value,
      selectedApps: this.selectedApps,
    });
  }
}
