import {Header,Footer,Content,SubHeader} from  "../../common/components/common"

import React, {Component} from  "react"
import "../styles/indexPage.css"
import "../styles/iconfont.css"
class NavList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="navList">
                <ul className="nav-list">
                    {
                        this.props.listData.map((ele,i)=><li key={i}>
                            <a href="##"><i className={ele.bg+" iconfont"}>{ele.icon}</i>{ele.text}</a>                        
                        </li>)
                    }
                </ul>
                <p>
                	<strong>京东</strong>
                    <span>快报</span> 
                    <b>: </b>
                    <i>热</i>
                    <b>&ensp;格力表彰大会，满减最高...</b>
                    <em>|更多</em>
                </p>
            </div>
        )
    }
}
NavList.defaultProps={
    listData:[
        {text:"京东超市",icon:"\ue6a7","path":"/",bg:"one"},
        {text:"全球购",icon:"\ue61a","path":"/",bg:"two"},
        {text:"服装城",icon:"\ue625","path":"/",bg:"three"},
        {text:"京东生鲜",icon:"\ue603","path":"/",bg:"four"},
        {text:"京东到家",icon:"\ue616","path":"/",bg:"five"},
        {text:"充值中心",icon:"\ue600","path":"/",bg:"six"},
        {text:"惠赚钱",icon:"\ue60d","path":"/",bg:"sev"},
        {text:"领券",icon:"\ue63a","path":"/",bg:"eig"},
        {text:"物流查询",icon:"\ue771","path":"/",bg:"nin"},
        {text:"我的关注",icon:"\ue621","path":"/",bg:"ten"}

    ]

}

class ProductShow extends Component　{
	constructor(props){
        super(props)
   	}
	render(){
		return (
			<div className="productShow" id="product-show">
				<div className="showTitle">
					<strong>京东秒杀 </strong>
					<b>22点场 </b>
					<span>01</span><i>:</i><span>29</span><i>:</i><span>57</span>
					<em>秒杀好货迎新</em>					
				</div>
				<div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
            		<div className="swiper-wrapper">
            			{
            				this.props.bannerData.map((ele,i)=><div key={i} className="swiper-slide">
            					<div>
            						<img src={ele} />
	            					<p><span>¥45555</span></p>
	            					<p><del>¥99999</del></p>
            					</div>
            				</div>)
            			}
            		</div>
            	</div>
            	<div>
            		<img src="111.jpg" />
            	</div>
			</div>
		)
	}
   	componentDidMount(){
	this.swiper = new Swiper(this.refs["swiper-container"],{
		slidesPerView:'6',
		freeMode: true,
		loop:true
	})
    }
    componentDidUpdate(){
    	this.swiper.update()
    	this.swiper.reLoop()
    }
}

class IndexPage extends Component　{
    constructor(props){
        super(props)
        this.state={
        	bannerData:[]
        }
        $.getJSON("http://datainfo.duapp.com/shopdata/getBanner.php?callback=?",{},(data)=>{
        	console.log(data)
        	this.setState({
	        	bannerData:JSON.parse(data[0].goodsBenUrl)      	
	        })
        	
        })     
    }
    render (){
    	console.log(this.state.bannerData)
        return (
        	<div className="indexPage" id="index-page">
	        	<Header title="首页" hasBack={false} />
	        	<Content>
	        		<div>
	        			<div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
	                		<div className="swiper-wrapper">
	                			{
	                				this.state.bannerData.map((ele,i)=><div key={i} className="swiper-slide">
	                					<img src={ele} />
	                				</div>)
	                			}
	                		</div>
	                	</div>
                		<div ref="pagination" className="swiper-self-pagination"></div>
                		<NavList/>
                		<ProductShow bannerData={this.state.bannerData}/>
	        		</div>
	        	</Content>
	        	<Footer active={0}/>
        	</div>
        )
    } 
    componentDidMount(){
    	this.swiper = new Swiper(this.refs["swiper-container"],{
    		pagination:this.refs.pagination,
    		slidesPerView:'1',
    		loop:true,
    		autoplay:1000
    	})
    }
    componentDidUpdate(){
    	this.swiper.update()
    	this.swiper.reLoop()
    }
}
export  default  IndexPage