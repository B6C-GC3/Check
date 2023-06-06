import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import utils from '../../utils/utils';

const Router = () => {

  const AdminLayout = utils.getRoute('/admin').component;
  const SupplierLayout = utils.getRoute('/supplier').component;
  const UserLayout = utils.getRoute('/user').component;
  const AppLayout = utils.getRoute('/').component;

  return (
    <Switch>
      <Route path="/admin" render={(props: any) => <AdminLayout {...props} />} />
      <Route path="/supplier" render={(props: any) => <SupplierLayout {...props} />} />
      <Route path="/user" render={(props: any) => <UserLayout {...props} />} />
      <Route path="/" render={(props: any) => <AppLayout {...props} />} />
    </Switch>
  );
};

export default Router;
