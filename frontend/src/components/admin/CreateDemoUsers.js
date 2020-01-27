import React, { Component } from 'react'
import './CreateDemoUsers.css';
import Config from '../../config';
import TokenService from '../../services/token-service';
export default class CreateDemoUsers extends Component {
    state = {disableButton: false}
    createFakeData = async (e) => {
        e.preventDefault();
        this.setState({enableButton: true})
        let res = await fetch(`${Config.API_ENDPOINT}/demo/make-demo-creators`, {
            method: "POST",
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        
        })
        if (res.ok) {
            this.setState({enableButton: false})
        }
    }
    render() {
        return (
            <button className="create-demo-users" disabled={this.state.disableButton} onClick={this.createFakeData}>create fake data</button> 
        )
    }
}
