import React, { Component } from 'react'
import Config from '../config';
import ApiCalls from '../services/apicall-service';
import TokenService from '../services/token-services';

export default class BackendCall extends Component {

    state = {
        result: '',
        result2: ''
    }

    onSumbmitHandler = async (e) => {
        e.preventDefault();
        let result = await ApiCalls.TestAPICall(`${Config.API_ENDPOINT}/testing`)

        if (result.success ) {
            TokenService.saveAuthToken(result.jwt);
            this.setState({result: "backend hit successful"})
        } else {
            this.setState({result: "backend hit not successful"})
        }
    }
    onProtectedSumbmitHandler = async (e) => {
        e.preventDefault();
        let result = await ApiCalls.TestProtectedAPICall(`${Config.API_ENDPOINT}/testing/protected`)

        if (result.success ) {
            this.setState({result2: "protected backend hit successful"})
        } else {
            this.setState({result2: "protected backend hit not successful"})
        }
    }
    render() {
        return (
            <div>
                <fieldset><legend>get jwt</legend>
                <form onSubmit={this.onSumbmitHandler}>
                    <input type="submit" value="get jwt"/>
                    <div>success: {this.state.result}</div>
                </form>
                </fieldset>
                <fieldset className={ this.state.result !== 'backend hit successful' ? 'hide' : 'show'}>
                    <legend>test protected endpoint</legend>
                <form onSubmit={this.onProtectedSumbmitHandler}>
                    <input type="submit" value="test protected endpoint"/>
                    <div>success: {this.state.result2}</div>
                </form>
                </fieldset>
            </div>
        )
    }
}
