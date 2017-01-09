import React,{Component} from "react"
import {Header,Content,Footer} from "../../common/components/common"
import "../styles/more.css"

class More extends Component {
	constructor(props){
		super(props)
		//初始状态
	}
	
	handleClick(a,index){
		console.log(index)
		//用三目运算来判断所要跳转的页面
		//当index=0时，跳转到change页面，index=2,3时跳转到more页面
		//window.location.hash="#/"+path是通过hash值来跳转
		var path = index==0?"change":index==1?"view":index==2?"guanyu":"login"
		if(index==3){
			window.localStorage.removeItem("userID");
		}
		window.location.hash="#/"+path
	}
	render(){
		return(
			<div className="more">
				<Header title="更多" hasBack={true}/>
				<Content hasFooter={true}>
					<div className="con-info">
						<ul className="con-list">
							{
								this.props.MoreData.map((ele,index)=><li key={index} onClick={()=>this.handleClick(this,index)}>
									{console.log(index)}
									<a>{ele}</a>
									<span>></span>
								</li>)
							}
						</ul>
					</div>
				</Content>
				<Footer active={4} />
			</div>
		)
	}
}
More.defaultProps={
	MoreData:["修改密码","用户反馈","关于","退出登录"]
}
export {More}
