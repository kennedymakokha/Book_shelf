import React from 'react';
import _ from 'lodash'


const Paginate = (props) => {
    let card = [];
    console.log(props.activeTab)
    _.times(props.pager, (i) => {
        card.push(<li className={props.activeTab === i + 1 ? "active" : null}><span onClick={() => props.page(i + 1)} >{i + 1}</span></li>);
    });

    
    return card

}


export default Paginate;