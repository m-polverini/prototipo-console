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
import { App } from './models/app';

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

  selectedApps: App[] = [];

  constructor() {}

  dettaglio() {
    this.mostraDettaglio = !this.mostraDettaglio;
  }

  showResult(result: any) {
    if (result) {
      this.searched = true;
      this.selectedApps = result.selectedApps;
    }
  }

  getClass(index: number, plus: number) {
    return 'order-' + (index + plus);
  }
}
