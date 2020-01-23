import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Article.css';
import Utils from '../services/utils';
import Sidebar from '../components/articles/Sidebar';

export default class Article extends Component {
    goToCreator = (creator) => {
        this.props.history.push(`/creator/${creator}`)
    }
    render() {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
            return (<></>)
        } else {
            let { index, name } = this.props.match.params;
            let { title, content, date_created } = this.context.creators[name].articles[index];
            return (
                <article>

                    <div className="article-header">
                        <h1>{title}</h1>
                        <div className="article-summary">{title}{title}{title}{title}</div>
                        <div className="article-author">by <span onClick={() => this.goToCreator(name)}>{name}</span> | {Utils.formatDate(date_created)} </div>
                    </div>

                    <div className="article-body">
                        <div className="article-main">
                            <div className="img-cont">
                                <img onClick={() => this.props.goToArticle(this.props.creator, 0)} src="/bmps/IMG_7548.jpeg" alt="title" />
                            </div>
                        
                            <div>
                                <p>{content}</p>
                                <p>{content}</p>
                                <p>{content}</p>
                                <p>{content}</p>
                                <p>{content}</p>
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                    

                </article>
            )
        }
    }
}
Article.contextType = SiteContext;