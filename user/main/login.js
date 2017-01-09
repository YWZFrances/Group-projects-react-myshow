import {Header,Content} from "../../common/components/common"
import {Tools} from "../../common/tools/tools"
import React,{Component} from "react"
import "../styles/login.css"
class Login extends Component{
	constructor(props){
		super(props)
		var data=window.localStorage.getItem("getUserID")
		//格式转化
		data=JSON.parse(data);
//		//需要是否显示密码
//		//是否记住密码			
		this.state={
			//初始状态不是getInitailState,也不是this.setState
			showPassword:false,
			remmeber:true,
			password:"",
			username:""
		}
		this.Addone=this.Addone.bind(this)
	}
		changeShowPassword(){
						
			this.setState({
				showPassword:!this.state.showPassword
			})		
			console.log("showPassword")
		}
		filterPassword(ev){
			//setState 不是同步的
			this.setState({
				password:ev.target.value
			})
			//this.state.password是用来保存密码的
			//ev.target.value=ev.target.value.replace(/sb/g,"")
		}
		filterUsername(ev){
			//ev.target.value用户输入的内容
			//对用户输入的内容可以进行过滤，再赋值个state
			//当state发生改变 视图回重新渲染
			this.setState({
				username:ev.target.value
			})
		}
		LoginIn(){
			//登录
			var user=$(".username").val()
			var pass=$(".password").val()
			if(user==""){
				alert("账户名为空")
			}else{
				if(pass==""){
					alert("密码为空")
				}else{
					var data={status:"login",userID:user,password:pass}
					$.get("http://datainfo.duapp.com/shopdata/userinfo.php",data,function(data){				
						console.log(data)
						if(data==0){
							alert("用户名不存在")
						}else if(data==2){
							alert("用户名密码不符")
						}else{
							alert("登录成功");
							Tools.setUserID("userID",JSON.stringify(user))
							window.location.hash="#/show"
						}
					},"json")			
				}
			}		
		}
		Addone(){
			this.setState({
				username:this.state.username,
				password:this.state.password
			})	
		}
	render(){
		var passwordType=this.state.showPassword?"text":"password";
		return(
			<div className="content"id="content-page">
				<Header title="开心摇摇用户登录" hasBack={true}/>
				<Content  hasFooter={false}>
					 <ul className="login-list">
	                <li>
	                    <input type="text" className="text-bar username" />
	                </li>
	                <li>
	                    <input type="password"  className="text-bar password"   />
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" />
	                        <span>记住密码</span>
	                    </label>
	
	                    <a className="go-forget">忘记密码？</a>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" defaultProps={this.state.showPassword} onClick={()=>this.changeShowPassword()} />
	                        <span>显示密码</span>
	                    </label>
	                </li>
	                <li>
	                    <button className="login-in" onClick={()=>this.LoginIn()}>登录</button>
	                </li>
	                <li>
	                    <a href="#/registered" className="go-reg">注册</a>
	                </li>	             
	            </ul>
			
				</Content>
			</div>
		)
	}
	
}
export  {Login}



