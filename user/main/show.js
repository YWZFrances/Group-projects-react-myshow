import React,{Component} from "react"
import {Header,Content,Footer} from "../../common/components/common"
import "../styles/show.css"
import {Tools} from "../../common/tools/tools"

class Show extends Component{
	constructor(props){
		super(props)
		
		var data=window.localStorage.getItem("getUrlID")
		data=JSON.parse(data)
		var id=Tools.getUserID("userID")
		this.state={
			"showname":id
		}
	}
	handleClick(i,index){
		console.log(1222)
		var path = index==0?"myorder":index==1?"youhui":index==2?"history":"shoucang"
		window.location.hash="#/"+path
	}
	
	render(){
		return(
			<div className="Page" id="Content-Page">
				<Header title="我的秀" hasRight={true} hasBack={true}/>
				<Content hasFooter={true}>
					<div className="con">
						<div className="top">
							<i className="iconfont icon-siji"></i>
							<div className="right">
								<p className="name-wrap"><span className="name">昵称:</span><em className="showname">{this.state.showname}</em></p>
								<p className="price-wrap"><span className="price">余额:</span><em className="red">895,554,215,321.30</em></p>
							</div>
						</div>
						<div className="bottom">
							<ul className="bottom-list">
								{
									this.props.BootomData.map((ele,index)=><li key={index} onClick={()=>this.handleClick(this,index)}><a>{ele}</a><span>></span></li>)
								}
							</ul>
						</div>
					</div>
				</Content>
				<Footer active="3"/>
			</div>
			
		)
	}
}
Show.defaultProps={
	BootomData:["我的订单","我的优惠券","浏览记录","我的收藏"]
}
export {Show}
