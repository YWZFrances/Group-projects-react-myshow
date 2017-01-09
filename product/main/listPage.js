import {Header,Footer,Content,SubHeader} from  "../../common/components/common"
import ProductList from "../components/product-list"
import {ScrollOptions} from "../../common/config/config"
import React, {Component} from  "react"
import ReactIScroll from "react-iscroll"
/*商品分类列表*/
class ClassList extends Component　{
    constructor(props){
        super(props);
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){    	  	
        return (
            <ul className="class-list">
                {
                    this.props.classData.map((ele,i)=><li onClick={()=>this.handleClick(ele.classID)}  key={i}>{ele.className}</li>) 
                }
            </ul>
        )
    }
}
ClassList.defaultProps={
    classData:[]
};




/*商品页面的顶层组件*/
class ListPage extends Component {
    constructor(props){
        super(props) ;//让react 的Component 帮你实现组件的方法
        this.state= {
            classData:[],
            productData:[],
        };
        //设置默认的数据请求选项
        this.classID = undefined;
        this.linenumber = 5;
        this.pageCode = 0;
        this.refresh = false;
        $.get("http://datainfo.duapp.com/shopdata/getclass.php",(data)=>{
            if(typeof data ==="string"){
                data = JSON.parse(data)
            }
            console.log(data)
//          var a ="";
//          data.map(function(ele,i){
//				a = ele.icon.slice(3,7)
//				a = "\\u" + a			
//				ele.icon = a
//          	console.log(ele.icon)	
//          })
            this.setState({
                classData:data
            })
        },"json");
        //请求商品数据
        this.getProductData();
        //改变this的指向
        this.onScrollEnd = this.onScrollEnd.bind(this)
    }
    changeClassID(id){
        console.log(id);
        console.log(this)
        this.classID = id;
        this.pageCode = 0; //重置页面
        this.getProductData()
        //滚动条回到顶部
//      this.refs.iScroll.withIScroll(function(iScroll){
//			iScroll.scrollTop(0.0)
//		})
    }
    getProductData(){
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
            "classID":this.classID,
            "linenumber":this.linenumber,
            "pageCode":this.pageCode
        },(data)=>{
            //刷新需要覆盖之前的数据，加载需要和之前的数据合并
            if(data){
                this.setState({
                    productData:this.pageCode==0?data:this.state.productData.concat(data)
                });
                //如果this.pageCode==0证明需要刷新，覆盖之前的数据，否则和之前的数据合并
            }
        })
    }
    onScrollEnd(myScroll){
        //myScroll 是ReactIScroll 提供的操作滚动条的对象
        console.log("end");
        if(this.refresh){
            //需要刷新就刷新
            this.pageCode=0;
            this.getProductData();
            this.refresh = false
        }else if(myScroll.y-myScroll.maxScrollY<=20){//需要当 前的滚动位置 和 最大的滚动数值(加载更多)
            console.log("加载更多");
            this.pageCode++;
            this.getProductData()
        }
    }
    onScroll(myScroll){
        console.log("scroll");
        if(myScroll.y>60){
            console.log("刷新");
            this.refresh = true
        }
    }
    render() {
        console.log("render");
        return (
            <div className="page" id="list-page">
                <Header title="新品上市" hasSearch={true} rightBtn={true}  />
                <SubHeader>
                    <ClassList changeClassID={(id)=>this.changeClassID(id)}  classData={this.state.classData} />
                </SubHeader>
                <Content hasFooter={true} hasSubHeader={true}  >

                    <ReactIScroll ref="iScroll" iScroll={IScroll}
                                  options={ScrollOptions}
                                  onScroll={(myScroll)=>this.onScroll(myScroll)}
                                  onScrollEnd={this.onScrollEnd}>
                        <ProductList productData={this.state.productData} />
                    </ReactIScroll>

                </Content>
                <Footer active={1} />
            </div>
        )
    }
}


ListPage.defaultProps= {
    listData:[]
};


export default  ListPage


