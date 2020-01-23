import React, { Component } from 'react';
import './Sidebar.css';
import ArticleColumn from './ArticleColumn';
export default class Sidebar extends Component {
    render() {
        return (
            <div className="article-sidebar">
                <ArticleColumn 
                    index={0}
                    startIndex={0}
                    endIndex={5}
                    />
            </div>
        )
    }
}
