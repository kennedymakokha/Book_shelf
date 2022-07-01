import React, { Component } from 'react';
import './css/blog.css'
import Layout from './layout';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getblogs } from './redux/actions/blogs'
import _ from 'lodash'
import BlogLoader from './common/blogLoader';
import BlogElemen from './mainComponents/blogElemen';
import Paginate from './mainComponents/paginate';
class Blogs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            activeTab: 1,
            limit: 3
        }
    }
    fetchdata = async () => {
        await this.props.getblogs(this.state.page, this.state.limit)
        this.setState({ activeTab: this.state.page })
    }

    prev = async () => {
        if (this.state.page >= 1) {
            this.setState(prevState => ({ page: prevState.page - 1 }))
            await this.fetchdata()
        }
    }
    page = async (data) => {
        this.setState({ page: data })
        await this.fetchdata()
    }
    next = async () => {
        if (this.state.page <= this.props.pager) {
            this.setState(prevState => ({ page: prevState.page + 1 }))
            await this.fetchdata()
        }

    }
    componentDidMount = async () => {

        await this.fetchdata()
    }
    render() {

        // const Paginate = () => {
        //     let card = [];
        //     _.times(thiprops.pager, (i) => {
        //         card.push(<li className={this.state.activeTab === i + 1 ? "active" : null}><span onClick={() => this.page(i + 1)} >{i + 1}</span></li>);
        //     });
        //     return card

        // }
        const K = () => {
            let card = [];
            _.times(3, (i) => {
                card.push(<BlogLoader />);
            });
            return card

        }

        return (
            <Layout>
                <div className="container-fluid">
                    <div className="dark-wrapper">
                        <div className="container inner">
                            <div className="grid-blog col3 isotope" style={{ position: "relative", overflow: "hidden", }}>

                                {this.props.loading ? <K /> : this.props.blogs.length === 0 ? <h2 style={{ textAlign: 'center' }}>No Blogs </h2> : this.props.blogs && this.props.blogs.map((blog, i) => (
                                    <BlogElemen blog={blog} />
                                ))}

                            </div>
                            {this.props.blogs.length > 0 ? this.props.loading ? null : <div className="pagination">
                                <ul>
                                    {this.state.page > 1 ? <li ><span onClick={this.state.page > 1 ? () => this.prev() : null}>{this.state.page > 1 ? "Prev" : "Null"}</span></li> : null}
                                    <Paginate page={(r) => this.page(r)} pager={this.props.pager} activeTab={this.state.activeTab} />
                                    {this.state.page < this.props.pager ? <li ><span onClick={async () => this.next()}>Next</span></li> : null}
                                </ul>
                            </div>:null}


                        </div>

                    </div>
                </div>
            </Layout >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.blogsData.error,
        loading: state.blogsData.loading,
        blogs: state.blogsData.blogs,
        pager: state.blogsData.pager
    }

};

export default connect(mapStateToProps, { getblogs })(withRouter(Blogs));
