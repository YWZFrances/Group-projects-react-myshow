/**
 * Created by hasee on 2016/12/29.
 */

import "../styles/common.css"
import React,{Component} from "react"

class Header extends Component {
    constructor(props) {
        super(props)
    }
    
    shangyige(){
    	
		window.history.go(-1)
    }
    toCart(){
    	window.location.hash = "#/cart"
    }
    toMyorder(){
    	window.location.hash = "#/myorder"
    }
    render () {

        return <div className="header">
            <ul className="header-list">
                <li className="header-btn">
                    {this.props.hasBack?<span onClick={()=>this.shangyige()}>{"<"}</span>:""}
                </li>
                <li className="header-tit">{this.props.title}</li>
                <li className="toCart" style={{marginRight:"15px"}}>
                	 {this.props.rightBtn?<a onClick={()=>this.toCart()}>购物车</a>:""}
                </li>
                <li className="toCart" style={{marginRight:"15px"}}>
                	 {this.props.rightBtn1}
                </li>
                <li className="toCart" style={{marginRight:"15px"}}>
                	 {this.props.rightBtn2?<a onClick={()=>this.toMyorder()}>我的</a>:""}
                </li>
            </ul>
        </div>
    }
}

Header.defaultProps={
    hasBack:true
};


class Footer extends Component{
	constructor(props){
		super(props)
	}
	handleClick(i,index){
		console.log(1222)
		var path = index==0?"/":index==1?"list":index==2?"cart":index==3?"show":"more"
		window.location.hash="#/"+path
	}
	render(){
		return(
			<div className="footer" >
			
				<ul className="footer-list ">
					{
						this.props.footerData.map((ele,index)=><li key={index} onClick={()=>this.handleClick(this,index)}>
							<a className={index==this.props.active?"active":""}>{ele}</a>
						</li>)
					}
				</ul>
			</div>
		)
	}
};
Footer.defaultProps={
    footerData:["首页","列表","购物车","我的","更多"]
};



class Content extends Component {
    constructor(props) {
        super(props)
    }
    render() {
    	
        let contentStyle = {
            "overflowY":this.props.hasIScroll?"hidden":"auto"
        };
        let contentClass = "content"
            +(this.props.hasFooter?" has-footer":"")
            +(this.props.hasSubHeader?" has-sub-header":"");

        //this.props.hasIScroll  如果需要iscroll就必须引入iscroll的结构

        return <div className={contentClass} style={contentStyle}>
            {this.props.hasIScroll?
                <div className="scroll-wrap" ref="scrollWrap">
                    <div className="scroller">
                        {this.props.children}
                    </div>
                </div>:this.props.children}
        </div>
    }
    componentDidMount() {

        //组件渲染完成以后，获取scroll-wrap，创建iscroll
        //如果需要iscroll再创建
        this.props.hasIScroll && (this.myScroll = new IScroll(this.refs.scrollWrap))
        //console.log(this.refs.scrollWrap)
       // console.log(this.myScroll)

    }
    componentDidUpdate() {
        //组件更新的时候，也更新iscroll
        this.props.hasIScroll && this.myScroll.refresh()
    }
}



//this.props.children 属性。它表示组件的所有子节点
class SubHeader extends Component {
    constructor (props){
        super(props)
    }
    render () {
        return (
            <div className="sub-header">{this.props.children}</div>
        )
    }

}




export { Header,Footer,Content,SubHeader}