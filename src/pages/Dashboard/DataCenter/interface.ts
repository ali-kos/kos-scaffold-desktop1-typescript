import { KosModel } from 'kos-core';

export interface IProps extends KosModel {
  name: string;
  showSavedItem: boolean;
  tabs: any;
  addForm: any;
}

export interface Init {
  name: string;
  showSavedItem: boolean;
  tabs: any;
  addForm: any;
}
