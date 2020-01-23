import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './CreatorPage.css';

export default class CreatorPage extends Component {
   
    render () {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
            return (<></>)
        } else {
        let { name } = this.props.match.params
        let { img_url, articles } = this.context.creators[name];
        let arts = articles.map((a, index) => <li onClick={() => this.context.goToArticle(name, index)}key={index}><h4>{a.title}</h4></li>)
        return (
            <div className="creator-page">
                <img src={img_url} alt="avatar" />
                <h2>{name}</h2>
                <h4>articles: </h4>
                <ul>{arts}</ul>
            </div>
        )
    }
       
    }
}
CreatorPage.contextType = SiteContext