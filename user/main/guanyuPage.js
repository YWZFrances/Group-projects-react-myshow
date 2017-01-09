import {Header,Footer,Content,SubHeader} from  "../../common/components/common"

import React, {Component} from  "react"




class YouhuiPage extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div>
            <Header title={"关于"} />
            <Content>
            	<h1>走秀网成立于2008年，总部位于中国深圳，在纽约，旧金山，伦敦，米兰，香港等城市设有子公司和运营分部。2012年，走秀网获得意大利顶级奢侈品牌菲拉格慕（Salvatore Ferragamo）官方授权，这也是中国电商获得奢侈品牌官方正式授权的首例</h1>
            </Content>
                
                <Footer hasFooter={true}  />
            </div>
        )
    }
}
export  default  YouhuiPage