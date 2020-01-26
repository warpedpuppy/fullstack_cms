import React, { Component } from 'react'
import './ArticleCreate.css';
import Config from '../../config';
import TokenService from '../../services/token-service';

export default class ArticleCreate extends Component {

    state = { disableButton: false }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({disableButton: true})
        let { title, description, content } = e.target;
        let obj = {
            title: title.value,
            description: description.value,
            content: content.value
        }

        let result = await fetch(`${Config.API_ENDPOINT}/articles/`, {
            method: "POST", 
            body: JSON.stringify(obj),
            headers: {
                "authorization": `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })

        console.log(result)
        if (result.ok) {
           this.setState({disableButton: false})
            title.value = '';
            description.value = '';
            content.value = '';
        }



    }
    render() {
        return (
            <form id="article-create" onSubmit={this.onSubmitHandler}>
                <div>
                    <input type="text" name="title" placeholder="title" />
                    <input type="text" name="description" placeholder="description" />
                    <textarea name="content" placeholder="article content" />
                    <input disabled={ this.state.viewButton } type="submit" />
                </div>
            </form>
        )
    }
}
