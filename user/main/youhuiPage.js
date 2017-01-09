import {Header,Footer,Content,SubHeader} from  "../../common/components/common"

import React, {Component} from  "react"




class GuanyuPage extends Component　{
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
            <Header title={"优惠"} />
            <Content>
            	<h1>土豪从来不用优惠券</h1>
            </Content>
                
                <Footer hasFooter={true}  />
            </div>
        )
    }
}
export  default  GuanyuPage