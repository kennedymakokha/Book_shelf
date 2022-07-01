import React from 'react';
import ContentLoader from 'react-content-loader'
const sidebarLoader = (props) => {

    return (
        <div className="column sidebar-content" >
            <div className="side-bar-header center">
                {props.data && props.data.title}
            </div>
            <div className="side-bar-body" >
                {props.data && props.data.elements.map((ele, i) => (
                    <div className="row" key={i} onClick={()=>props.click(ele._id)}>
                        <i style={{ paddingRight: '10px' }} className={props.data.icon}></i>  {ele.name}
                    </div>
                ))}

            </div>
        </div>
    );

}

export default sidebarLoader;