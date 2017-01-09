/**
 * Created by hasee on 2017/1/4.
 */
import {Header,Content} from  "../../common/components/common"
import React,{Component} from  "react"
import  "../styles/confirm.css"

//订单内容部分---------------------------------------------------------------------
class OrderProductInfo extends Component {
	//在react class里需要设置state的初始值或者是绑定事件时，用constructor
    constructor(props){
        super(props)
    }
    //渲染订单内容
    render(){
        //this.props.productInfo
        //购物车页面的点击进入订单页productInfo:this.state.cartData=>这个存入了localStorage
//      productInfo是从localStorage里面拿出来的购物车的数据
        var data = this.props.productInfo||[];
        //循环遍历
        //页面上有的数据
        console.log(data);
        return (
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg}/>
                        <div className="text-info">
                            <p>{ele.goodsName} </p>
                        </div>
                        <div className="num-info">
                            <p><em className="jiage">${ele.price}</em></p>
                            <p>*{ele.number}</p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}

//订单页面的footer部分-------------------------------------------------------------
class ConfirmFooter extends Component {
    constructor(props){
        super(props)
    }
    //点击提交按钮调用的函数
    orderSubmit(){
        console.log("提交订单,生成真实订单");
        console.log(this.props.orderData);
        console.log(this.props.totalNum);
        console.log(this.props.totalPrice);
        //1未付款，2未发货，3待收货，4待评价

        //订单的数据模型
        var orderItem = {
        	//订单号  订单类型(未发货，已付款，正在派送。。。。。) 总个数 总数量 总
            orderID: new Date().getTime(),
            orderState:Math.ceil(Math.random()*4),
            totalNumber:this.props.totalNum,
            totalPrice:this.props.totalPrice,
            //orderData就是获取的购物车的localStorage  cartData
            //orderProductInfo 每条订单的商品信息
            orderProductInfo:this.props.orderData.productInfo
        };
		console.log(orderArray)
		//window.localStorage.getItem("orderData") ==null

        // 之前没有订单的话，让订单的数组等于一个空数组
       var orderArray  = JSON.parse(window.localStorage.getItem("orderData")||"[]") ;

        //在订单列表里面，添加当前订单
        orderArray.push(orderItem);
        //保存在localStorage里面
        console.log(orderArray)
        window.localStorage.setItem("orderData",JSON.stringify(orderArray))
    }
    render(){

        return(
            <div className="confirm-footer">
                <p className="num-info">
                    <span>总数:<em>{this.props.totalNum}</em></span> &nbsp;
                    <span>总金额:<em>{this.props.totalPrice}</em></span>
                </p>
                <button className="tijiaodingdan" onClick={()=>this.orderSubmit()}>提交订单</button>
            </div>
        )
    }
}

//订单页面-----------------------------------------------------------------------------------
class ConfirmPage extends Component {
    constructor(props){
        super(props);
        //现在本存储里面获取
        var data =  window.localStorage.getItem("cartData");
        //格式转换，
		console.log(data)
		data = JSON.parse(data)
        this.state = {
            orderData:data,
            yunFei:30
        };
    }
    
    toMyorder(){
    	window.location.hash="#/myorder"
    }
    
    render() {
        var data = this.state.orderData;
        var allPrice = this.state.yunFei+data.totalPrice;
        return (
            <div className="page" id="confirm-page">
                <Header title="确认订单" rightBtn2={<a href="javascript:;" onClick={()=>this.toMyorder()}>我的</a>} />
                <Content hasFooter={true}>
                    <div className="ads-info">
                    	<p>收货人:成敏    电话 <span>13111112222</span></p>
                    	<p>收货地址:北科</p>
                    </div>
                    <div className="order-info">
                        <OrderProductInfo productInfo={data.productInfo} />
                        <div className="order-price">
                            <p><em>运费：{this.state.yunFei}</em></p>
                            <p><em>实付（含运费）:{allPrice}</em></p>

                        </div>
                        <textarea className="user-info" placeholder="请写下信息备注"></textarea>

                    </div>

                </Content>
                <ConfirmFooter totalNum={data.totalNumber}  orderData={data}  totalPrice={allPrice} />
            </div>
        )
    }
}

export default ConfirmPage