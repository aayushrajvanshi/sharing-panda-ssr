import React, { Component } from 'react';
import axios from 'axios';

class AddFundraiser extends Component {
    constructor(props) {
        super(props);
        this.name = '';
        this.age = ';'
        this.title = '';
        this.description = '';
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/v1/fundraisers',
            data: {
                name: this.state.name,
                age: this.state.age,
                title: this.state.title,
                description: this.state.description
            }
        })
    }

    render() {
        return (
            <div className="uk-container uk-container-small">
                <form onSubmit={this.handleSubmit}>
                    <fieldset className="uk-fieldset">
                        <div className="uk-margin">
                            <input name="name" className="uk-input" type="text" placeholder="Name" onChange={this.handleInputChange} />
                        </div>
                        <div className="uk-margin">
                            <input name="age" className="uk-input" type="text" placeholder="Age" onChange={this.handleInputChange} />
                        </div>
                        <div className="uk-margin">
                            <input name="title" className="uk-input" type="text" placeholder="Title" onChange={this.handleInputChange} />
                        </div>
                        <div className="uk-margin">
                            <input name="description" className="uk-input" type="text" placeholder="Description" onChange={this.handleInputChange} />
                        </div>
                        <button className="uk-button uk-button-primary uk-width-1-1" type="submit">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default AddFundraiser;