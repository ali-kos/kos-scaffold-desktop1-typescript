import { GetKosState, KosDispatch, KosModel as IModel } from 'kos-core';

import { IPortA } from './dto';
import { Init } from './interface';
import { portA } from './service';

class Model implements IModel<Init> {
  public namespace: string;
  public initial: {
    name: "123";
    showSavedItem: false;
    tabs: [];
  };
  public reducers: any = {
    updateState(state: Init, { payload }: { payload: Init }) {
      return {
        ...state,
        ...payload
      };
    }
  };
  public asyncs: any = {
    async getPortA(dispatch: KosDispatch, getState?: GetKosState<Init>) {
      const listData: IPortA = await portA("111");
      console.log(listData);
    }
  };
  public setup = () => {
    // `setup` functon could be removed if empty inside.
  };
}

export default new Model();
