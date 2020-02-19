import React, { Component } from 'react'
import AdminServices from '../../services/admin-services';
import './GetBucketContents.css';
import Config from '../../config';
export default class GetBucketContents extends Component {
    state = {photos: [], lastPhotoKey: ''}

    getBucketContents = async (e) => {
        let photos = await AdminServices.getBucketContents();
        console.log(photos)
        this.setState({photos: photos.Contents, lastPhotoKey: photos.Contents[photos.Contents.length - 1].Key}, () => {
            console.log(this.state)
        })
    }


    render() {
        let imgs = this.state.photos.map( (photo, i) => {
            if (!photo.Key.includes('.')) return;
            return <img alt="bucket images" src={`${Config.IMAGE_ROOT_NO_DIR}${photo.Key}`} key={i} />
        })
        return (
            <div>
                <button 
                className="get-bucket-contents-button"
                onClick={this.getBucketContents}>get bucket contents</button>
                <div className="photos-from-bucket">
                    {imgs}
                </div>
            </div>
        )
    }
}
