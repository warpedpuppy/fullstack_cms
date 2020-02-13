import React, { Component } from 'react'
import AdminServices from '../../services/admin-services';
import './GetBucketContents.css';

export default class GetBucketContents extends Component {

    getBucketContents = async (e) => {
        let res = await AdminServices.getBucketContents();
        console.log(res)
    }

    render() {
        return (
            <div>
                <button 
                className="get-bucket-contents-button"
                onClick={this.getBucketContents}>get bucket contents</button>
            </div>
        )
    }
}
