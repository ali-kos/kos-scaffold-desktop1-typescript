import { GetKosState, KosDispatch, KosModel as IModel } from 'kos-core';

import { Init } from './interface';
import { login } from './services';

class Model implements IModel<Init> {
  public namespace: string;
  public initial: any = {
    name: "123"
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
    async login(dispatch: KosDispatch, getState?: GetKosState<Init>) {
      const { loginForm } = getState!();
      await login(loginForm);
    }
  };
}

export default new Model();
