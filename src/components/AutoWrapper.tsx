import KOS from 'kos-core';
import * as loadsh from 'lodash';
import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import { siderMenus } from '../common/utils/Menus';

const RouterWrapper = ({ router = {}, history = {} }) => {
  if (!(router instanceof Array)) {
    throw new Error("router config is expected an Array!");
  }
  if (router.length <= 0) {
    return null;
  }

  return (
    <Switch>
      {router.map(_ => {
        const { Component, path } = _;

        const currentRoute = loadsh.find(siderMenus, (item: any) => {
          return item.path === path;
        });
        const childPath = currentRoute.route.toLowerCase();

        return (
          <Route
            key={childPath}
            path={childPath}
            render={() => <Component history={history} namespacePath={path} />}
          />
        );
      })}
    </Switch>
  );
};

export const AutoWrapper = (config: {
  KOSconfig?: any;
  router?: any[];
}): any => (Component: React.ComponentClass<any>) => {
  const KOSconfig = config.KOSconfig || {};

  const KosWrapper = KOS.Wrapper({
    namespace: Symbol("namespace"),
    autoReset: false,
    ...KOSconfig
  })(Component);

  class Cp extends React.PureComponent<
    RouteComponentProps<any> & { routers: JSX.Element; namespacePath?: string }
  > {
    public render() {
      const { namespacePath = "", history } = this.props;
      const Rt = <RouterWrapper history={history} router={config.router} />;

      // 判断是否使用KOS
      if (KOSconfig.model) {
        const namespace = KOSconfig.namespace || namespacePath;
        return (
          <KosWrapper
            namespace={namespace}
            history={history}
            {...this.props}
            routers={Rt}
          />
        );
      }
      return <Component {...this.props} history={history} routers={Rt} />;
    }
  }

  return withRouter(Cp);
};
