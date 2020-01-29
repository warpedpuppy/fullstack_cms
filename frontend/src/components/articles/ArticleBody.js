import React from 'react'
import Sidebar from './Sidebar';
import Utils from '../../services/utils';
export default function ArticleBody(props) {
    return (
        <>
        <div className="article-header">
            <h1>{props.title}</h1>
            <div className="article-summary">
                {props.description}</div>
            <div className="article-author">by&nbsp;
                <span onClick={
                    () => this.context.goToCreator(props.author_id)
                }>
                    {props.username}</span>
                | {
                Utils.formatDate(props.date_created)
            } </div>
        </div>

        <div className="article-body">
            <div className="article-main">
                <div className="img-cont">
                    <img src={props.img_url}
                        alt="title"/>
                </div>
                <div>
                    <p>{props.content}</p>
                </div>
            </div>
            <Sidebar/>
        </div>
        </>
    )
}
