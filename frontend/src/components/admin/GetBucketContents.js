import React, { Component } from 'react'
import AdminServices from '../../services/admin-services';
import './GetBucketContents.css';
import Config from '../../config';
export default class GetBucketContents extends Component {
    state = {photos: []}

    getBucketContents = async (e) => {
        let photos = await AdminServices.getBucketContents();
        console.log(photos)
        this.setState({photos})
    }

    render() {
        let imgs = this.state.photos.map( (photo, i) => {
            return <img alt="bucket images" src={`${Config.IMAGE_ROOT_NO_DIR}${photo.Key}`} key={i} />
        })
        return (
            <div>
                <button 
                className="get-bucket-contents-button"
                onClick={this.getBucketContents}>get bucket contents</button>
                <div className="photos">
                    {imgs}
                </div>
            </div>
        )
    }
}
