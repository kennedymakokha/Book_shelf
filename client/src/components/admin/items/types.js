import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import TableLoader from '../../common/tableLoader';
import { gettypes, posttype } from '../../redux/actions/types'
class Types extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 5,
            activeTab: 1,
        }
    }

    // prev = async () => {
    //     if (this.state.page >= 1) {
    //         this.setState(prevState => ({ page: prevState.page - 1 }))
    //         await this.fetchdata()
    //         // await this.fetchnotedata()
    //     }
    // }
    // page = async (data) => {
    //     this.setState({ page: data })
    //     await this.fetchdata()
    //     // await this.fetchnotedata()
    // }
    // next = async () => {
    //     if (this.state.page <= this.props.pager || this.state.page <= this.props.adminblogs) {
    //         this.setState(prevState => ({ page: prevState.page + 1 }))
    //         await this.fetchdata()
    //         await this.fetchnotedata()
    //     }

    // }
    componentDidMount = async () => {

        await this.props.gettypes()
    
    }
    render() {
        return (
            <div>
               {this.props.loading ?<TableLoader/>: <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '5px' }}>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.types.map((v, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{v.name}</td>
                            </tr>
                        ))}


                        {/* ))} */}
                    </tbody>
                </table>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.typesData.error,
        loading: state.typesData.loading,
        types: state.typesData.types,
        pager: state.typesData.pager,
    }

};

export default connect(mapStateToProps, { posttype, gettypes })(withRouter(Types));


