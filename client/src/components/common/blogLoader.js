import React, { Component } from 'react';
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom';
class BlogLoader extends Component {
    render() {
        return (
            <div className="post isotope-item divPost">
                <ContentLoader viewBox="0 0 310 250">
                    <rect x="0" y="0" rx="5" ry="5" width="310" height="250" />
                </ContentLoader>
                <figure className="icon-overlay medium icn-link"><Link to={`/blogs/$blog.slug}`}><span className="icn-more"></span>

                </Link></figure>
                <div className="image-caption">
                    <h3 className="post-title">
                        <ContentLoader viewBox="0 0 310 20">
                            <rect x="0" y="0" rx="5" ry="5" width="74" height="17" />
                        </ContentLoader>

                    </h3>
                    <div className="meta"> <span className="date">
                        <ContentLoader viewBox="0 0 200 20">
                            <rect x="0" y="0" rx="5" ry="5" width="62" height="14" />
                        </ContentLoader>
                    </span>
                    </div>
                    <ContentLoader viewBox="0 0 420 20">
                        <rect x="0" y="0" rx="5" ry="5" width="1000" height="14" />
                    </ContentLoader>
                </div>
            </div>


        );
    }
}

export default BlogLoader;