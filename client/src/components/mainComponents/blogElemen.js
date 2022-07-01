import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

class BlogElemen extends Component {
    render() {
        const { blog } = this.props
        const text = this.props.blog.body;
        const count = 200;
        const result = text.slice(0, count) + (text.length > count ? "..." : "");

        return (
            <div className="post isotope-item divPost">
                {/* <figure className="icon-overlay medium icn-link"><Link to={`/blogs/${blog.slug}`}><span className="icn-more"></span><img className="blogImg" src={blog.file ? blog.file : "https://demos.elemisthemes.com/slowave/full/style/images/art/gb1.jpg"} alt="" /></Link></figure> */}
                <div className="image-caption">
                    <figure className="icon-overlay medium icn-link"><Link to={`/blogs/${blog.slug}`}><span className="icn-more"></span><img className="blogImg" src={blog.file ? blog.file : "https://demos.elemisthemes.com/slowave/full/style/images/art/gb1.jpg"} alt="" /></Link></figure>

                    <h3 className="post-title"><Link
                        to={{
                            pathname: `/blogs/${blog.slug}`,
                            state: { id: blog.slug, } // your data array of objects
                        }}
                    >{blog && blog.title}</Link></h3>
                    <div className="meta"> <span className="date">{moment(blog.createdAt).format('ll')}</span> <span className="comments"><>{blog.comments.length} Comments</></span> <span className="like">{blog.likes !== undefined && blog.likes.length} <i className="fa fa-heart" style={{ color: "red" }}></i></span> </div>
                    <p>{result}</p>
                </div>
            </div>
        );
    }
}

export default BlogElemen;