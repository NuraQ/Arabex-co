
import React, { Component } from 'react';
import './App.css';
import App from './App';
import Home from './Home';
import './login.css';
import { MeventEmitter, url_g, mainUrl } from './globals.js'
import { BrowserRouter, Route } from 'react-router-dom';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: true,
            success: false,
            storeURL: "",
            originalURL:mainUrl.url
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.doFetch = this.doFetch.bind(this);
        
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleclick = () => {
        if (!this.state.username) {
            return this.setState({ error: true });
        }

        if (!this.state.password) {
            return this.setState({ error: true });
        } else {
            this.setState({ error: false })
        }
        this.doFetch();
    }
    async doFetch() {
        let ID = this.state.username;
        let pass = this.state.password;
        console.log(this.state);
        var url = mainUrl.url+"/process_get/:id?";
        let url2 = url + "id=" + `${ID}` + "&" + "pass=" + `${pass}`;
        const response = await fetch(url2)

        const body = await response.json();
        alert(body.response);
        //let res = await JSON.parse(response)
        if (body.response.status == 200) {
            console.log("LLLLLLLL");
            this.setState({ success: true });
        }
    }
    handleSubmit(evt) {

        evt.preventDefault();

    }
    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };
    passData(name, pass) {

        this.props.history.push({
            pathname: '/App',
            state: { Name: name, pass: pass }//has nothing with component state
        })
    }
    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }
    store=e=>{
        if(e.target.value!=""){
this.setState({storeURL:e.target.value});
        }
    }
    handleURL=e=>{
        mainUrl.url=this.state.storeURL;
        this.forceUpdate();
    }
    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
console.log(this.state);
        return (
            
            <div>
                {!this.state.success || this.state.error ? (
                    <div className="Login">
                        <form className="form-container sign-in-container" onSubmit={this.handleSubmit}>
                            {
                                this.state.error &&
                                <h3 data-test="error" onClick={this.dismissError}>
                                    {this.state.error}
                                </h3>
                            }
                            <p>User Name</p>
                            <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />

                            <p>Password</p>
                            <input type="password" data-test="password" value={this.state.password} onChange={this.handlePassChange} />
                            <p>url</p>

                            <input type="text" data-test="url" value={this.state.mainUrl} onChange={this.store} />
                            <button onClick={this.handleURL}> store url</button>
<br></br>
<button onClick={()=>{mainUrl.url=this.state.originalURL}}> retrieve url</button>
<br></br>
                            <button className="button" onClick={this.handleclick} data-test="submit" >Log in </button>
                        </form>
                    </div>
                ) : (<BrowserRouter>
                    {/* <label onClick={() => this.passData(this.state.username, this.state.password)} value="click here">/*/}
                    <Route path="/" render={() => <div><App /></div>}/>

                </BrowserRouter>

                    )}
            </div>
        );

    }

}

export default LoginPage;