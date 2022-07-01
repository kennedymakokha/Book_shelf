import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getareas, postarea, deletearea } from '../../redux/actions/area'
class Instituition extends Component {
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
    deleteCourse = async (id) => {
        await this.props.deletearea(id)
        await this.props.getareas()
    }
    componentDidMount = async () => {

        await this.props.getareas()

    }
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: '5px' }}>#</th>
                        <th >Name</th>
                        <th style={{ width: '200px', textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.areas && this.props.areas.map((v, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{v.name}</td>
                            <td>
                                {/* <button
                                    type="button"
                                    className="btn-xs  right"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    // onClick={() => this.fetchUses('cc')}
                                >
                                    <i className="fas fa-user-edit"></i>  Edit
                                </button> */}
                                <button
                                    type="button"
                                    className="btn-xs  right"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                    onClick={() => this.deleteCourse(v._id)}
                                >
                                    {v.deletedAt !== null ? <><i className="fa fa-user"></i>  Diasble</>:<><i className="fa fa-user"></i>  Enable</>}
                                </button>

                            </td>
                        </tr>
                    ))}


                    {/* ))} */}
                </tbody>
            </table>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        error: state.areaData.error,
        loading: state.areaData.loading,
        areas: state.areaData.areas,
        pager: state.areaData.pager,

    }

};

export default connect(mapStateToProps, { getareas, postarea, deletearea })(withRouter(Instituition));


