import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getlevels, postlevel } from '../../redux/actions/level'
class Level extends Component {
    render() {
        return (
            <tbody>
                {this.props.data.map((v, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{v.name}</td>
                        <td>{v.type.name}</td>
                    </tr>
                ))}

            </tbody>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.levelData.error,
        loading: state.levelData.loading,
        levels: state.levelData.levels,
        pager: state.levelData.pager,
    
    }

};

export default connect(mapStateToProps, {    getlevels, postlevel })(withRouter(Level));


