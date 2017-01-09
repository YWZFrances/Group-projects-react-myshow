/**
 * Created by hasee on 2017/1/3.
 */
import React, {Component} from  "react"
import ReactDOM from "react-dom"
import {Router,Route,hashHistory,Link} from "react-router"

import CartPage from "./order/main/cartPage"
import ConfirmPage from "./order/main/confirmPage"
import MyorderPage from "./order/main/myorderPage"
import {Login} from "./user/main/login"
import {Registered} from "./user/main/registered1"
import {Show} from "./user/main/show"
import {More} from "./user/main/more"
import YouhuiPage from "./user/main/youhuiPage"
import ShoucangPage from "./user/main/shoucangPage"
import {Change} from "./user/main/change"
import {View} from "./user/main/view"
import GuanyuPage from "./user/main/guanyuPage"


import IndexPage from "./product/main/indexPage"
import ListPage from "./product/main/listPage"
import DetailPage from "./product/main/detailPage"
import Information from "./product/main/proInformation"
import FootmarkPage from "./product/main/footmark-page"


ReactDOM.render(<Router history={hashHistory}>

    <Route path="cart" component={CartPage}  />
    <Route path="confirm" component={ConfirmPage}  />
    <Route path="myorder" component={MyorderPage}  />
    <Route path="login" component={Login}  />
    <Route path="registered" component={Registered}  />
    <Route path="show" component={Show}  />
    <Route path="more" component={More}  />
    <Route path="youhui" component={YouhuiPage}  />
    <Route path="shoucang" component={ShoucangPage}  />
    <Route path="change" component={Change}  />
    <Route path="view" component={View}  />
    <Route path="guanyu" component={GuanyuPage}  />

    <Route path="/" component={IndexPage}  />
    <Route path="list" component={ListPage}  />
    <Route path="detail(/:goodsID)" component={DetailPage} />
    <Route path="information(/:goodsID)" component={Information}  />
    <Route path="history" component={FootmarkPage}  />

</Router>,document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}