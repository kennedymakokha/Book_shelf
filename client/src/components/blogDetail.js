import React, { Component } from 'react';
import './css/blog.css'
import Layout from './layout';
import P from './images/logo.png'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getblog, likelog } from './redux/actions/blogs'
import { postcomment, getcomments, postreply } from './redux/actions/comments'
import CommentTextarea from './mainComponents/commenttextArea';
import moment from 'moment'
import NotAuthorized from './mainComponents/not.js';
class BlogDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            blog: "",
            comment: '',
            slug: "",
            notauth: false,
            reply: false,
            errored: false
        }
    }
    submitComment = async (e) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (!userInfo) {
            alert('kindly log in ')
            return
        }
        e.preventDefault()
        const data = {
            body: this.state.body,
            blog: this.state.blog
        }
        await this.props.postcomment(data)
        this.setState({ body: "" })
        await this.props.getcomments(this.props.blog._id)

    }
    likeBlog = async (e) => {
        try {
            await this.props.likelog(e)
            await this.props.getblog(this.state.slug)
        } catch (error) {
            this.setState({ notauth: true })
        }
    }
    submitReply = async (e) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (!userInfo) {
            alert('kindly log in ')
            return
        }
        try {
            e.preventDefault()
            const data = {
                body: this.state.body,
                comment: this.state.comment
            }
            await this.props.postreply(data)
            await this.props.getcomments(this.props.blog._id)
            await this.props.getblog(this.state.slug)
            this.setState({ reply: false })
        } catch (error) {
            this.setState({ errored: true })
        }
    }
    componentDidMount = async () => {
        const Id = this.props.match.params.id;
        await this.props.getblog(Id)
        await this.props.getcomments(this.props.blog._id)
        this.setState({
            blog: this.props.blog._id,
            slug: Id
        })


    }
    render() {
        const { comments } = this.props

        return (
            <Layout>
                <div className="container-fluid">
                    <div className="dark-wrapper">
                        <div className="container inner">
                            <div className="row" >
                                <div className="col-sm-8 content" >
                                    <div className="classic-blog single" >
                                        <div className="post format-image" >
                                            <figure className="icon-overlay medium icn-link main">

                                            </figure>
                                            <div className="post-content image-caption" >
                                                <img src={this.props.blog.file ? this.props.blog.file : P} className="blogPInamge" alt="" />
                                                <h1 className="post-title">{this.props.blog.title}</h1>
                                                <div className="meta"><span className="date">{moment(this.props.blog.createdAt).format('ll')}</span> <span className="category"><>Collage</>, <>O level</>, <>A level</></span> <span className="comments"><>{comments !== undefined && comments.length} Comments</></span> <span className="like"><>{this.props.blog.likes !== undefined && this.props.blog.likes.length} <i className="fa fa-heart" style={{ color: 'red' }}></i></></span> </div>
                                                <p>{this.props.blog.body} </p>
                                                <div className="meta tags"><>journal</>, <>illustration</>, <>design</>, <>daily</></div>
                                                <div className="share"> <button className="btn share-facebook" onClick={() => this.likeBlog(this.props.blog._id)}>Like</button> <button className="btn share-twitter">Tweet</button> <button className="btn share-googleplus">+1</button> <button className="btn share-pinterest">Pin It</button> </div>
                                            </div>

                                        </div>


                                    </div>
                                    <div className="divide30"></div>
                                    {/* <div className="divide50"></div> */}
                                    <div id="comments" >
                                        <h3>{comments !== undefined && comments.length} Comments</h3>
                                        <ol id="singlecomments" className="commentlist">
                                            {comments && comments.map((com, i) => (
                                                <li>

                                                    <div className="message">
                                                        <div className="image-caption">
                                                            <div className="info">
                                                                <h2 style={{ textTransform: 'capitalize' }}>{com.createdBy && com.createdBy.firstname} {com.createdBy && com.createdBy.surname}</h2>
                                                                <div className="meta">
                                                                    <div className="date">{moment(com.createdAt).fromNow()}</div>
                                                                    <span className="reply-link" onClick={() => this.setState({ reply: true, comment: com._id })}>Reply</span> </div>
                                                            </div>
                                                            <p>{com.body}</p>
                                                            {com.replies.map((rep, i) => (
                                                                <div className="comment-reply">
                                                                    <img src={P} className="user" alt="" />
                                                                    <p>ken said that..</p>
                                                                </div>
                                                            ))}

                                                        </div>
                                                    </div>
                                                </li>
                                            ))

                                            }            </ol>
                                    </div>


                                    <div className="comment-form-wrapper" style={{width:"90vw"}} >
                                        <div className="comment-form" name="form_name" >
                                            <div className="message-field">
                                                <textarea
                                                    name="textarea"
                                                    value={this.state.body}
                                                    required
                                                    id="textarea"
                                                    onChange={(e) => this.setState({ body: e.target.value })}
                                                    rows="5" cols="30"
                                                    placeholder={comments !== undefined && comments.length === 0 ? "Be the First to comment here..." : "Enter your comment here..."}></textarea>
                                            </div>
                                            <button onClick={(e) => this.submitComment(e)} className="btn btn-submit" >Submit</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <NotAuthorized hide={() => this.setState({ notauth: false })} show={this.state.notauth} />
                        <CommentTextarea error={this.props.commentsErr} errored={this.state.errored} submit={(e) => this.submitReply(e)} onChange={e => this.setState({ body: e.target.value, errored: false })} show={this.state.reply} hide={() => this.setState({ reply: false, comment: "" })} comments={comments} />
                    </div>
                </div >
            </Layout >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.blogsData.error,
        loading: state.blogsData.loading,
        blog: state.blogsData.blog,
        comments: state.commentsData.comments,
        commentsErr: state.commentsData.error,
        commentsloading: state.commentsData.loading

    }

};

export default connect(mapStateToProps, { getblog, likelog, getcomments, postcomment, postreply })(withRouter(BlogDetail));
