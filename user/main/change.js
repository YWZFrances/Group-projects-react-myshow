import React,{Component} from "react"
import {Header,Content} from "../../common/components/common"
import "../styles/change.css"
import {Tools} from "../../common/tools/tools"

class Change extends Component{
	constructor(props){
		super(props)
		//获取localStorage上的数据
		var data=window.localStorage.getItem("getUserID")
		data=JSON.parse(data)
		this.state={
			"old-key":"",
			"new-key":"",
			"agin-key":""
		}
		this.Addone=this.Addone.bind(this)
	}
	filterPassword(ev){
		//输入密码
		this.setState({
			password:ev.target.value
		})	
	}
//	changeIn(){
//		var iii = JSON.parse(Tools.getUserID("loginData"))
//		//输入框中输入的原密码
//		var oldpass=$(".old-key").val()
//		var newpass=$(".new-key").val()
//		var aginpass=$(".agin-key").val()
//		if(oldpass!=iii.password){
//			console.log("WWWWW")
//			alert("原密码错误")
//		}else{
//			if(newpass==""){
//				alert("新密码不能为空")
//			}
//			else if(newpass!=aginpass){
//				alert("两次输入新密码不一致")
//			}else{
//				console.log("aaaaaa")
//				alert("修改密码成功")
//				Tools.setUserID("loginData",JSON.stringify({password:$(".new-key").val()}))
//			}
//		}
//	}
	Addone(){
			this.setState({
				password:this.state.password
			})	
		}
	render(){
		return(
			<div className="change" id="change-page">
				<Header title="修改密码"/>
				<Content hasFooter={false}>
					<div className="key">
						<ul className="key-list">
							<li className="list-in">
								<input type="text" className="old-key" placeholder="请输入原密码" />
							</li>
							<li className="list-in">
								<input type="text" className="new-key" placeholder="请输入新密码" />
							</li>
							<li className="list-in">
								<input type="text" className="agin-key" placeholder="请再次输入新密码" />
							</li>
						</ul>
						<div className="list-bt">
							<button className="bt" onChange={()=>this.filterPassword()} >保存</button>
						</div>
					</div>
				</Content>
			</div>
		)
	}
}
export {Change}
