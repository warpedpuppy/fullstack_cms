import React, { Component } from 'react';
import CreatorService from '../services/creators-service';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
class Home extends Component {

   
   
    logArticles = (creator) => {
        this.props.history.push(`/creator/${creator}`)
        console.log(this.context.creators[creator])
    }
    render() {
        let creators = Object.keys(this.context.creators).map( (creator, index) => {
           return <li key={index} onClick={() => this.logArticles(creator)}>{ creator }</li>
        })
        return (
            <div>
                <h1>home</h1>
                <ul>{creators}</ul>
            </div>
        )
    }
}
Home.contextType = SiteContext;
export default withRouter(Home);