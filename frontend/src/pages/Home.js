import React, { Component } from 'react';
import ArticleColumn from '../components/articles/ArticleColumn';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Home.css';
import EventBand from '../components/events/EventBand';

class Home extends Component {
    state = {
        currentPage: 1
    }

    handleNext = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    }

    handlePrev = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    }

    render() {
        const { currentPage } = this.state;
        const itemsPerPage = 10;
        const totalArticles = this.context.articles ? this.context.articles.length : 0;
        const totalPages = Math.ceil(totalArticles / itemsPerPage);
        
        const offset = (currentPage - 1) * itemsPerPage;

        return (
            <>
            <EventBand />
            <div className="article-list">
                <ArticleColumn 
                    startIndex={offset}
                    endIndex={offset + itemsPerPage}
                />
            </div>
            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button 
                        onClick={this.handlePrev} 
                        disabled={currentPage === 1}
                        className="btn-paginate"
                    >
                        Previous
                    </button>
                    <span className="page-info">Page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={this.handleNext} 
                        disabled={currentPage >= totalPages}
                        className="btn-paginate"
                    >
                        Next
                    </button>
                </div>
            )}
            </>
        )
    }
}
Home.contextType = SiteContext;
export default withRouter(Home);