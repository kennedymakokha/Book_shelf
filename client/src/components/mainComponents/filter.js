import React from 'react';

const Filter = props => {

    return (
        <select required={props.required}
            style={{ marginRight: '20px' }}
            onChange={props.setData}
        >
            <option>Select a {props.title}</option>
            {props.data.map((cat, i) => (
                <option value={cat._id} key={i}>{cat.name}</option>
            ))
            }
            <option value="all">all</option>
        </select>
    );
}


export default Filter;