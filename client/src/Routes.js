import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminRoute from './auth/helper/AdminRoutes'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateStock from './admin/UpdateStock'
import ManageCategory from './admin/ManageCategory'
import UpdateCategory from './admin/UpdateCategory'
import ProductDetails from './core/ProductDetails'
import Cart from './core/Cart'
import PayemntSuccess from './core/PayemntSuccess'
import MyOrders from './user/MyOrders'
import Orders from './admin/Orders'
import OrderedProducts from './admin/OrderedProducts'
import UpdateStatus from './admin/UpdateStatus'

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>  
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component= {Signup} />
          <Route exact path='/signin' component= {Signin} />
          <PrivateRoute exact path='/user/dashboard' component={UserDashBoard} />
          <AdminRoute exact path='/admin/dashboard' component={AdminDashBoard} />
          <AdminRoute exact path='/admin/create/category' component={AddCategory} />
          <AdminRoute exact path='/admin/create/product' component={AddProduct} />
          <AdminRoute exact path='/admin/products' component={ManageProducts} />
          <AdminRoute exact path='/admin/categories' component={ManageCategory} />
          <AdminRoute exact path='/admin/product/update/:productId' component={UpdateProduct} />
          <AdminRoute exact path='/admin/category/update/:categoryId' component={UpdateCategory} />
          <AdminRoute exact path='/admin/product/stock/update/:productId' component={UpdateStock} />
          <AdminRoute exact path='/admin/orders' component={Orders} />
          <AdminRoute exact path='/admin/order/view/:orderId' component={OrderedProducts} />
          <AdminRoute exact path='/admin/order/update/:orderId' component={UpdateStatus} />
          <PrivateRoute exact path='/product/:productId' component={ProductDetails} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute exact path='/payment/success' component={PayemntSuccess} />
          <PrivateRoute exact path='/user/orders' component={MyOrders} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
