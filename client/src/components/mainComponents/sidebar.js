import React from 'react';
import ContentLoader from 'react-content-loader'
import _ from 'lodash'
const Sidebar = (props) => {
    const K = () => {
        let card = [];
        _.times(4, (i) => {
            card.push(<ContentLoader key={i} viewBox="0 0 380 70">
                {/* Only >SVG shapes */}
                <rect x="0" y="0" rx="5" ry="5" width="30" height="30" />
                <rect x="50" y="0" rx="4" ry="4" width="250" height="30" />
                {/* <rect x="80" y="40" rx="3" ry="3" width="250" height="10" /> */}
            </ContentLoader>);
        });
        return card

    }
    return (
        <div className="column sidebar-content" >


            <div className="side-bar-header center">

                {!props.loading && props.data ? props.data.title : <ContentLoader viewBox="0 0 280 40">
                    <rect x="20" y="10" rx="5" ry="5" width="240" height="30" />
                </ContentLoader>}

            </div>
            <div className="side-bar-body" >

                {!props.loading && props.data ? props.data.elements.map((ele, i) => (
                    <div className="row" key={i} onClick={() => props.click(ele._id)}>
                        <i style={{ paddingRight: '10px' }} className={props.data.icon}></i>  {ele.name}
                    </div>
                )) : <K />}
            </div>
        </div>
    );

}

export default Sidebar;