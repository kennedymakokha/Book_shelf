import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import TableLoader from '../../common/tableLoader';
import { fetchUsers, approvecc } from '../../redux/actions/users'
class Types extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 5,
            activeTab: 1,
        }
    }
    fetchUses = async (ext) => {

        await this.props.fetchUsers(`${ext}`)
    }
    aproveUser = async (id) => {
        await this.props.approvecc(id)
        await this.props.fetchUsers(`cc`)
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

        await this.props.fetchUsers('all')

    }
    render() {
        return (
            <>
                <div>
                    <button
                        type="button"
                        className="small primary right"
                        style={{ marginTop: 10, marginBottom: 10 }}
                        onClick={() => this.fetchUses('all')}
                    >
                        All Users
                    </button>
                    <button
                        type="button"
                        className="small primary right"
                        style={{ marginTop: 10, marginBottom: 10 }}
                        onClick={() => this.fetchUses('applied')}
                    >
                        Applicants
                    </button>
                    <button
                        type="button"
                        className="small primary right"
                        style={{ marginTop: 10, marginBottom: 10 }}
                        onClick={() => this.fetchUses('cc')}
                    >
                        Creators
                    </button>
                </div>
                {this.props.loading ? <TableLoader /> : <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '5px' }}>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Tel</th>
                            <th>Contents</th>
                            <th>status</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users && this.props.users.map((v, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{v.firstname} {v.firstname}</td>
                                <td>{v.email}</td>
                                <td>{v.phone}</td>
                                <td>{v.phone}</td>
                                <td>{v.phone}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn-xs  right"
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                        onClick={() => this.fetchUses('cc')}
                                    >
                                        <i className="fas fa-user-edit"></i>  Edit
                                    </button>
                                    {/* <button
                                        type="button"
                                        className="btn-xs  right"
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                        onClick={() => this.fetchUses('cc')}
                                    >
                                        <i className="fa fa-user"></i>  Diasble
                                    </button> */}
                                    <button
                                        type="button"
                                        className="btn-xs  right"
                                        style={{ marginTop: 10, marginBottom: 10 }}
                                        onClick={() => this.aproveUser(`${v._id}`)}
                                    >
                                       {v.applied && !v.cc ?  "Approve": "Revoke"}
                                    </button> 
                                </td>
                            </tr>
                        ))}


                        {/* ))} */}
                    </tbody>
                </table>}</>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.usersData.error,
        loading: state.usersData.loading,

        users: state.usersData.users,

        pager: state.usersData.pager,


    }

};

export default connect(mapStateToProps, { fetchUsers, approvecc })(withRouter(Types));


