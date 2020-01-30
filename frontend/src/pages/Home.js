import React, { Component } from 'react';
import ArticleColumn from '../components/articles/ArticleColumn';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Home.css';
import EventBand from '../components/events/EventBand';

class Home extends Component {

    render() {
        return (
            <>
            <EventBand />
            <div className="article-list">
                <ArticleColumn 
                    index={0}
                    startIndex={0}
                    endIndex={2}
                />
                  <ArticleColumn 
                    index={0}
                    startIndex={2}
                    endIndex={5}
                />
                   <ArticleColumn 
                    index={0}
                    startIndex={5}
                    endIndex={8}
                />
                  <ArticleColumn 
                    index={0}
                    startIndex={8}
                />
            </div>
            </>
        )
    }
}
Home.contextType = SiteContext;
export default withRouter(Home);