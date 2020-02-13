import React, { Component } from 'react'
import AdminServices from '../../services/admin-services';

export default class GetBucketContents extends Component {

    getBucketContents = (e) => {

    }

    render() {
        return (
            <div>
                <button onClick={this.getBucketContents}>get bucket contents</button>
            </div>
        )
    }
}
