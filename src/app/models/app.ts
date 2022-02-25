import { Stati } from './Stati';

export interface App {
  label: string;
  stati: Stati[];
  detail: boolean;
}

export const APPS: App[] = [
  {
    label: 'Rimborsi',
    stati: [
      { id: 1, desc: 'In Compilazione' },
      { id: 2, desc: 'Annullate' },
      { id: 3, desc: 'In Attesa di Modifica' },
      { id: 4, desc: 'Da Definire' },
      { id: 5, desc: 'In Definizione' },
      { id: 6, desc: 'In Sospeso' },
      { id: 7, desc: 'Da Integrare' },
      { id: 8, desc: 'Accettate' },
      { id: 9, desc: 'Rigettate' },
    ],
    detail: false,
  },
  {
    label: 'Regimi Speciali',
    stati: [
      { id: 1, desc: 'In Compilazione' },
      { id: 2, desc: 'Annullate' },
      { id: 3, desc: 'In Attesa di Modifica' },
      { id: 4, desc: 'Da Definire' },
      { id: 5, desc: 'In Definizione' },
      { id: 6, desc: 'In Sospeso' },
      { id: 7, desc: 'Da Integrare' },
      { id: 8, desc: 'Accettate' },
      { id: 9, desc: 'Rigettate' },
    ],
    detail: false,
  },
  {
    label: 'Domiciliazioni',
    stati: [
      { id: 1, desc: 'In Compilazione' },
      { id: 2, desc: 'Annullate' },
      { id: 3, desc: 'Da Definire' },
      { id: 4, desc: 'In Definizione' },
      { id: 5, desc: 'Accettate' },
      { id: 6, desc: 'Rigettate' },
    ],
    detail: false,
  },
  {
    label: 'Memorie Difensive',
    stati: [
      { id: 1, desc: 'In Compilazione' },
      { id: 2, desc: 'Annullate' },
      { id: 3, desc: 'In Attesa di Modifica' },
      { id: 4, desc: 'Da Definire' },
      { id: 5, desc: 'In Definizione' },
      { id: 6, desc: 'In Sospeso' },
      { id: 7, desc: 'Da Integrare' },
      { id: 8, desc: 'Accettate' },
      { id: 9, desc: 'Rigettate' },
    ],
    detail: false,
  },
  {
    label: 'Rateizzazioni',
    stati: [
      { id: 1, desc: 'In Compilazione' },
      { id: 2, desc: 'Annullate' },
      { id: 3, desc: 'In Attesa di Modifica' },
      { id: 4, desc: 'Da Definire' },
      { id: 5, desc: 'In Definizione' },
      { id: 6, desc: 'In Sospeso' },
      { id: 7, desc: 'Da Integrare' },
      { id: 8, desc: 'In Attesa di Determina' },
      { id: 9, desc: 'Accettate' },
      { id: 10, desc: 'Rigettate' },
    ],
    detail: false,
  },
];
