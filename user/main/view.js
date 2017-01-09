import React,{Component} from "react"
import {Header,Content} from "../../common/components/common"
import "../styles/view.css"

class View extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className="view" id="view-page">
				<Header title="意见反馈"/>
				<Content hasFooter={false}>
					<div className="tex">
						<textarea></textarea>
					</div>
					<div className="list-bt">
						<button className="bt" onClick={()=>this.RegisteredIn()}>提交</button>
					</div>
				</Content>
			</div>
		)
	}
}
export {View}
