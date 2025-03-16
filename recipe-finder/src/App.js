import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Signin from './components/Signin';
import Register from './components/Register';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Recipe from './components/Recipe';
import './App.css';

import axios from "axios";
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const initialState = {
  input: '',
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.files[0]});
  }

  onButtonSubmit = async () => {
    if (this.state.input !== '') {
      const formData = new FormData();
      formData.append("file", this.state.input);

      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("File uploaded successfully!");
      } catch (err) {
        console.log("Error uploading file:", err);
      }

      fetch(`${process.env.REACT_APP_BACKEND_URL}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
        const output = document.getElementById('output');
        output.innerHTML = md.render(response);

        if (response.trim() !== "There is no food in this image.") {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(err => console.log("Error getting entries:", err))
          }
        }
      })
      .catch(err => console.log("Error calling API:", err));
    } else {
      console.log("No file uploaded");
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <Recipe/>
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
