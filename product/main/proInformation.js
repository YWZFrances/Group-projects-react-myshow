import {Header,Content} from  "../../common/components/common"

import React, {Component} from  "react"

class ProInformation extends Component{
	constructor(props){
		super(props);
		this.state={
        	bannerList:[],
        	productName:"",
        	goodsID:"",
        	className:""
        }
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
        	goodsID:this.props.params.goodsID
        },(data)=>{
        	console.log(data);
        	var date = new Date();
        	this.setState({
		  		bannerList:JSON.parse(data[0].imgsUrl),
		  		productName:data[0].goodsName,
		  		goodsID:data[0].goodsID,
		  		className:data[0].className,
		  		other:date.getTime()
        	})
        })
	}
	render(){
		return (
			<div>	
				<Header title="商品资料" rightBtn={true}/>
				<div>
					<img src={this.state.bannerList[0]} />
					<p>品牌名称:{this.state.productName.slice(0,5)}</p>
					<p>商品名称:{this.state.productName}</p>
					<p>材质:面料:65.5%粘纤,34.5棉;里料:100%聚合纤维</p>
					<p>产地:中国</p>
					<p>商品编号:{this.state.goodsID}</p>
					<p>洗涤说明:最高洗涤温度30度,缓和程序,不可漂白,悬挂晾干,熨斗底板最高温度110度,不可干洗</p>
					<p>所属分类:{this.state.className}</p>
					<p>备注:无配件</p>
					<p>其他:{this.state.other}</p>
				</div>
			</div>
		)
	}
}
export default ProInformation