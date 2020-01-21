import React, { Component } from 'react';
import CreatorService from '../services/creators-service';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Home.css';

class Home extends Component {

    goToCreator = (creator) => {
        this.props.history.push(`/creator/${creator}`)
    }
    goToArticle = (creator, index) => {
        this.props.history.push(`/article/${creator}/${index}`)
    }

    render() {
        let creators = Object.keys(this.context.creators).map( (creator, index) => {
           return (
           <li key={index}>
               <img onClick={() => this.goToArticle(creator, 0)} src="/bmps/IMG_7548.jpeg" alt="title" />
               <div>
                <h4 onClick={() => this.goToArticle(creator, 0)}>{ this.context.creators[creator].articles[0].title }</h4>
                <span>by&nbsp;
                    <span 
                        onClick={() => this.goToCreator(creator)}
                        className="author-link">
                        { creator }
                    </span>
                </span>
               </div>
            </li>)
        })
        return (
            <div>
                <ul className="article-list">{creators}</ul>
            </div>
        )
    }
}
Home.contextType = SiteContext;
export default withRouter(Home);