import { Breadcrumb, Icon } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IMenu {
  path: string;
  Component: string;
  icon: string;
  name: string;
  mpid: string;
  route: string;
}

interface IProps {
  siderMenus: IMenu[];
  location: any;
}

export const Bread = ({ siderMenus, location }: IProps) => {
  /* 
    siderMenus 是由上级传过来的 故已经是处理好route的数组
    进行比较 返回当前选中的路由元素
  */
  const activeItem = siderMenus.find((item: any) => {
    return location.pathname.includes(item.route);
  });

  function getBreadArray(
    item: IMenu,
    array: IMenu[],
    path: string,
    mpid: string
  ) {
    const arr: any[] = [];
    if (!item[mpid]) {
      return arr;
    }

    function getBreadParent(item1: IMenu) {
      const item2: IMenu | undefined = array.find(_ => item1[mpid] === _[path]);
      arr.push(item2);
      if (item2 && item2[mpid]) {
        getBreadParent(item2);
      }
    }

    getBreadParent(item);
    return arr;
  }
  let breadArray = [];
  if (activeItem) {
    breadArray = getBreadArray(
      activeItem,
      siderMenus,
      "path",
      "mpid"
    ).reverse();
  }
  const BreadcrumbItem = (props: any) => (
    <Breadcrumb.Item key={props.route}>
      <Link to={props.route} replace={true}>
        <Icon type={props.icon} /> {props.name}
      </Link>
    </Breadcrumb.Item>
  );

  return activeItem ? (
    <Breadcrumb>
      {breadArray.map(_ => BreadcrumbItem(_))}
      <Breadcrumb.Item>
        <Icon type={activeItem.icon} /> {activeItem.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  ) : (
    <Breadcrumb>
      <Breadcrumb.Item>404</Breadcrumb.Item>
    </Breadcrumb>
  );
};
