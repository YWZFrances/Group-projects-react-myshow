import React,{Component} from "react"
import {Header,SubHeader,Content} from "../../common/components/common"
import "../styles/myorder.css"

class StateList extends  Component{

    constructor (props){
        super(props)
    }
    changeState(index){
        console.log(index)
        this.props.selectOrderState(index)
    }
    render() {
        var data = this.props.stateData||["全部","未支付","待发货","待收货","待评价"];
        return (
            <ul className="order-state-list" >
                {
                    data.map((ele,i)=><li key={i} onClick={()=>this.changeState(i)}>
                        {ele}
                    </li>)
                }
            </ul>
        )
    }
}


class OrderBtns extends  Component{

    constructor (props){
        super(props)
    }
    cancelOrder(orderID){
        this.props.cancelOrder(orderID)
    }
    render() {
        var state = this.props.orderState;

        return (
            <div className="order-btns">
                {
                    state==1?<div>
                        <div>待付款</div>
                        <button>立即付款</button>
                        <button onClick={()=>this.cancelOrder(this.props.orderID)}>取消订单</button>
                    </div>:state==2?<div>
                        <div>待发货</div>
                        <button>提醒发货</button>
                        <button onClick={()=>this.cancelOrder(this.props.orderID)}>取消订单</button>
                    </div>:state==3?<div>
                        <div>待收货</div>
                        <button>确认发货</button>
                    </div>:<div>
                        <div>待评价</div>
                        <button>去评价</button>
                    </div>
                }

            </div>
        )
    }
}

class OrderProductInfo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        //this.props.productInfo
        var data = this.props.productInfo||[];
//      console.log(data);
//      console.log(this.state.orderData)
        return (
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg}/>
                        <div className="text-info">
                            <p>{ele.goodsName} </p>
                        </div>
                        <div className="num-info">
							<p>{ele.orderState} </p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}


class OrderList extends  Component{

    constructor (props){
        super(props)
    }
    render() {
        var data = this.props.orderData||[];
        console.log(data); //所有的订单
        return (
            <ul className="order-list" >
                {
                    data.map((ele,i)=><li className="order-item" key={i}>
                        {/*ele 是每一个条订单的信息
                         ele.orderProductInfo 每条订单的商品信息
                        */}
                        <OrderProductInfo productInfo={ele.orderProductInfo}/>
                        <div className="total-info">
                            <span>总数量:<em>{ele.totalNumber}</em></span>
                            <span>总金额:<em>{ele.totalPrice}</em></span>
                        </div>
                        <OrderBtns orderState={ele.orderState}
                                   orderID={ele.orderID}
                                   cancelOrder={this.props.cancelOrder}
                        />
                    </li>
                    )
                }
            </ul>
        )
    }
}







class OrderListPage extends  Component{

    constructor (props){
        super(props);

        //所有的订单
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        this.state = {
            orderData:data
        };

        //console.log(data)
        //当点击切换状态的时候，需要对所有的订单里面的内容进行过滤
        this.selectOrderState= this.selectOrderState.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
    }
    cancelOrder(orderID){
        console.log("取消订单");

        //更新state （setState ）
        var state = this.state.orderData;
        state= state.filter(function(ele){
            return ele.orderID!=orderID
        });
        this.setState({
            orderData:state
        });

        //更新本地存储的数据
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        data = data.filter(function(ele){
            return ele.orderID!=orderID
        });
        window.localStorage.setItem("orderData",JSON.stringify(data));





    }

    selectOrderState(index){
        //获取所有订单数据
        var data =  JSON.parse(window.localStorage.getItem("orderData")||"[]");
        //通过index过滤得到想要显示的数据
        if(index!=0){
            data = data.filter(function(ele){
                return ele.orderState==index
            });
        }
        //改变组件的state，让组件重新渲染
        this.setState({
            orderData:data
        });
    }
    render() {
        return (
            <div className="page" id="order-list-page">
                <Header title="我的订单" />
                <SubHeader>
                    <StateList selectOrderState={this.selectOrderState} />
                </SubHeader>
                <Content hasSubHeader={true} >
                    <OrderList orderData={this.state.orderData}
                               cancelOrder={this.cancelOrder}
                    />
                </Content>
            </div>
        )
    }


}


export  default  OrderListPage





