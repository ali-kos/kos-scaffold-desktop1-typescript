import { KosModel } from 'kos-core';

export interface IProps extends KosModel {
  name: string;
  showSavedItem: boolean;
  tabs: any;
  history: any;
  match: any;
}

export interface Init {
  name: string;
  showSavedItem: boolean;
}
