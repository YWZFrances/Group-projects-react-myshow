import {Header,Footer,Content,SubHeader} from  "../../common/components/common"

import React, {Component} from  "react"




class ShoucangPage extends Component　{
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
            <Header title={"收藏"} />
            <Content>
            	<h1>你这店没啥好东西,我一个也不收藏~</h1>
            </Content>
                
                <Footer hasFooter={true}  />
            </div>
        )
    }
}
export  default  ShoucangPage