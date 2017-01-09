/**
 * Created by hasee on 2017/1/4.
 */

import {Header,Content,SubHeader,Footer} from  "../../common/components/common"
import {Tools} from  "../../common/tools/tools"
import React,{Component} from  "react"
import  "../../common/styles/common.css"
import  "../styles/cart.css"

//购物车内容区-------------------------------------------------------------------------------
class CartList extends Component {
	//当你在react class中需要设置state的初始值或者是绑定事件时，用constructor
    constructor(props){
        super(props)
    }
    //渲染购物车内容区
    //循环cartData的图 名字 价格 数量(默认为1)
    //加减数量
    //删除按钮
//  changeData函数表示购物车的变化 加 减 删除

//35行是加减 调用changeData函数，传入1或者是-1和下标(i) 1和-1都是true 0是false，表示删除
    render () {
    	var data = this.props.cartData||[]
        return (
            <ul className="cart-list">
                {
                    data.map((ele,i)=><li key={i} className="cart-item" >
                        <a href="###" className="pic"><img src={ele.goodsListImg} /></a>
                        <div className="info">
                            <p className="p-name">{ele.goodsName}</p>
                            <p className="price"><em className="jiage">${ele.price}</em></p>
                            <div className="num-wrap">
                                <span className="jian" onClick={()=>this.props.changeData(-1,i)}  >-</span>
                                <input className="geshu" type="text" value={ele.number} />
                                <span className="jia" onClick={()=>this.props.changeData(1,i)} >+</span>
                            </div>
                        </div>
                        <a className="delete" onClick={()=>this.props.changeData(0,i)}  href="javascript:;" >删除</a>
                        <div className="clear"></div>
                    </li>)
                }
            </ul>
        )
    }
}

//购物车页面--------------------------------------------------------------------------------
class CartPage extends Component {
	//当在react的class中需要设置state初始值或者是绑定事件的时候，可以用constructor
    constructor(props){
        super(props);
		//设置默认值
		// 购物车的数据 总价 总个数
        this.state={
            cartData:[],
            totalNumber:0,
            totalPrice:0
        };
		//获取localStorage中的数据 判断有没有登录
		//只有登录了才能获取购物车的数据
		//网址？userID=注册的哪个ID
        var id = Tools.getUserID();
        id && $.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:id},(data)=>{
            console.log(data);
            //获取到了数值，就让cartData=data
            this.setState({
                cartData:data
            });
            //getTotal函数调用查看所有的物品的数量总和，和总价格，下面用到
            this.getTotal(data)
        });
		
        this.changeData = this.changeData.bind(this)
    }
	
	//购物车加减删除，两个参数，第一个是操作，第二个是下标(哪一个进行此操作)
	//上面点击事件调用此函数
    changeData(type,index){
        console.log(this)
        console.log(type);
        console.log(index)
        var userID = Tools.getUserID();
        var data = this.state.cartData;
        //data数据的第几个商品的goodsID
        var id = data[index].goodsID;
        //data数据的第几个商品的number
        var number = data[index].number;
        if(type){
            //加减
            //页面上的number值改变
            number=type+number*1;
            //不能小于1
            if(number<1){
            	number = 1
            }
            //然后数据里的number也要跟着改变
            data[index].number = number
        }else {
            //删除
            number=0;
            //从数据里删除此数据
            data.splice(index,1)
        }
        //改变数值之后，重新设置cartData的值=新的data
        this.setState({
            cartData:data
        });
        //getTotal函数调用查看所有的物品的数量总和，和总价格，下面用到
        this.getTotal(data)
        //接口需要 传入userID goodsID number 定义对象，整个传入
        var sendData = {"userID":userID,"goodsID":id,"number":number}
        //数据请求 保存修改完之后的数据(更新购物车接口)
        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",sendData,function (data) {
                console.log(data)
            },"json")
    }
    
    //计算总数量总价
    getTotal(data){
        var number = 0;
        var price = 0;
        for(var i=0;i<data.length;i++){
        	//循环 把所有的商品的number值都加起来，注意隐式转换
            number+=data[i].number*1;
            //循环 把每个商品的number和price相乘，然后相加
            price+=data[i].number*data[i].price
        }

        this.setState({
        	//设置总价总数量
            totalNumber:number,
            totalPrice:price
        });
    }
    
    
    //去订单页函数 下面调用
    toConfirm(){
    	//把cartData数据传入localstorage，注意转换成字符串
        window.localStorage.setItem("cartData",JSON.stringify({
        	//总数 总价 购物车信息(显示在订单页)
            totalPrice:this.state.totalPrice,
            totalNumber:this.state.totalNumber,
            productInfo:this.state.cartData
        }));
        //哈希值单页面跳转到订单页
        window.location.hash="#/confirm"
    }
    //渲染购物车页面
    render() {
        return (
            <div className="page" id="cart-page">
                <Header title="购物车" rightBtn1={<a href="javascript:;" onClick={()=>this.toConfirm()}>结算</a>} />
                <SubHeader>
                    <div className="cart-bar">
                        <span>总数:{this.state.totalNumber}</span>
                        <span>总金额:${this.state.totalPrice}</span>
                    </div>
                </SubHeader>
                <Content hasFooter={true} hasSubHeader={true}>
                    <CartList changeData={this.changeData} cartData={this.state.cartData}/>
                </Content>
                <Footer shuliang={this.state.totalNumber} active="2"/>
            </div>
        )
    }
}

export default  CartPage