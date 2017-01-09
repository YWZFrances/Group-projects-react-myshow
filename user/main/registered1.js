import {Header,Content} from "../../common/components/common"
import React,{Component} from "react"
import {Tools} from "../../common/tools/tools"
import "../styles/registered.css"
class Registered extends Component{
	constructor(props){
		super(props)
		//初始状态
		this.state={
			username:"",
			password:"",
			login:false
		}
		this.Addone=this.Addone.bind(this)
	}
	filterUsername(ev){
		//改变状态，输入用户名
		this.setState({
			username:ev.target.value
		})
	}
	filterPassword(ev){
		//改变状态，输入密码
		this.setState({
			password:ev.target.value
		})
	}
	RegisteredIn(ev){
		//点击注册
		console.log($(".username").val());
        console.log($(".password").val());
        var user=$(".username").val()
        var password=$(".password").val()
        var aginpass=$(".aginpassword").val()
        console.log(user)
        
        var Zuser=/^[1][358][0-9]{9}$/
        var Zpassword=/^[a-z0-9_-]{6,18}$/
        //正则判断
        if(user==""){        	
        	alert("用户名不能为空")
        }else if(!Zuser.test(user)){
        	console.log(1111)
        	alert("用户名不符")
        	return
        }else{
        	if(password==""){
	        	alert("密码不能为空")
	        }else if(!Zpassword.test(password)){
	        	alert("密码不符")
	        }else if(aginpass!=password){
	        	alert("两次密码不一致")
	        }else{
	        	//当正则验证成功时，login为true，此时可以通过接口返回值来判断是否已经注册过
	        	this.state.login = true	        	
					if(this.state.login){
			        	console.log(222)
			        	//接口中所需的参数
			        	var data = {status:"register",userID:user,password:password}
			        	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",data,function(data){
			        		console.log(data)
			        		if(data==0){
			        			alert("该用户名已经注册")
			        		}else if(data==1){
			    				alert("注册成功")	
			    				//当返回数据为1时可以注册，此时将注册信息存入localstorage里面
				        		
			        			window.location.hash="#/login"  //注册成功后跳转至登录页面  
			        		}else{
			    				console.log(data)
			    				console.log("数据库报错")
			        		}
			        	},"json")
			        	this.state.login=false
		        	}
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
		return(
			<div className="content"id="content-page">
				<Header title="注册" hasBack={true}/>
				<Content  hasFooter={false}>
					<ul className="content-list">
						<li className="list-in">
							<input type="text" className="username" placeholder="请输入账户" />
							<p className="tx1">账户名称：</p>
						</li>
						<li className="list-in">
							<input type="password" className="password" placeholder="请输入密码" />
							<p className="tx2">登录密码：</p>
						</li>
						<li className="list-in">
							<input type="password" className="aginpassword" placeholder="请输入密码" />
							<p className="tx3">确认密码：</p>
						</li>
					</ul>
					<div className="list-bt">
						<button className="bt" onClick={()=>this.RegisteredIn()}>注册</button>
					</div>
				</Content>
			</div>
		)
	}
	
}
export  {Registered}
