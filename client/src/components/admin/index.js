import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Layout from './../layout/index'
class index extends Component {
    render() {
        const data = [
            {
                name: 'types',
                link: '',
                icon: '',

            },
            {
                name: 'instituitions',
                link: '',
                icon: '',

            },
            {
                name: 'level',
                link: '',
                icon: '',

            },
            {
                name: 'courses',
                link: '',
                icon: '',

            },
            {
                name: 'content-creators',
                link: '',
                icon: '',

            },
            {
                name: 'notes',
                link: '',
                icon: '',

            },
            {
                name: 'blogs',
                link: '',
                icon: '',

            },
            {
                name: '',
                link: '',
                icon: '',

            },
        ]
        return (
            <Layout>
                <div className="row container-fluid">
                    {data.map((data) => (
                        <div className="card1 eleveted row center" key={data.name}>
                            <div className="card-body " >
                                <Link to={`/admin/${data.name}`} >
                                    {/* <i className="fas fa-download" ></i> */}
                                    <h2 >{data.name}</h2>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </Layout>
        );
    }
}

export default index;