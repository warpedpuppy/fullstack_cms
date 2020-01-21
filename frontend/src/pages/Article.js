import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Articles.css';
export default class Article extends Component {
   
    render() {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
            return (<></>)
        } else {
            let { index, name } = this.props.match.params;
            let { title, content } = this.context.creators[name].articles[index];
            return (
                <div>
                    <h2>{title}</h2>
                    <pre>{content}{content}{content}</pre>
                </div>
            )
        }
    }
}
Article.contextType = SiteContext;