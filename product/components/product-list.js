/**
 * Created by hasee on 2016/12/30.
 */

import "../styles/product-list.css"
import React,{Component} from "react"
import {Link} from "react-router"
/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
    constructor(props){
         super(props)
    }
    toDetail(ele){
		var footmarkData = JSON.parse(window.localStorage.getItem("footmarkData")||"[]");
		
		for(var i=0;i<footmarkData.length;i++){
		    if(footmarkData[i].goodsID==ele.goodsID){
		        footmarkData.splice(i,1);
		        break
		    }
		}
		footmarkData.unshift(ele);
		window.localStorage.setItem("footmarkData",JSON.stringify(footmarkData));
		
		window.location.hash = "#/detail/"+ele.goodsID
    }
    render(){
        return (
            <ul className="product-list">
                {
                    this.props.productData.map((ele,i)=><li key={i} onClick={()=>this.toDetail(ele)}>
                        <Link to={"/detail/"+ele.goodsID}>
                         	<img src={ele.goodsListImg}/>
                         	<p>{ele.goodsName}</p>
                         	<p>
                         		<em>￥{ele.price}</em>
                         		<del>￥999</del>
                         	</p>
                        </Link>
                    </li>)
                }
            </ul>
        )
    }

}
ProductList.defaultProps={
    productData:[]
};


export default ProductList