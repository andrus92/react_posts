import './App.css';
import React from 'react';
import Post from './components/Post';
import Modal from './components/Modal';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      editingPostId: undefined,
      data : []
    }
  }

  componentDidMount() {
    // Runs after the first render() lifecycle
    fetch('https://jsonplaceholder.typicode.com/posts?_start=1&_limit=10')
      .then((response) => response.json())
      .then((json) => this.setState({data: json}))
      .catch(err => console.error(err));
  }

  renderPosts = () => {

    return (
      <ul>
        {
          this.state.data.map((post) =>
            <Post 
              key={post.id} 
              id={post.id} 
              title={post.title}
              body={post.body}
              removePostFnc={this.removePost}
              setModalWindowActiveFnc={this.setModalWindowActive}
            />
          )
        }
      </ul>
    );
  }

  setModalWindowActive = (id) => {
    this.setState({editingPostId: id});
  }

  setModalWindowInactive = () => {
    this.setState({editingPostId: undefined});
  }

  removePost = (id) => {
    const intId = parseInt(id);
    const newData = this.state.data.filter(post => post.id !== intId);
    this.setState({data: newData});
  }

  editPost = (id, newTitle, newText) => {
    const intId = parseInt(id);
    const elemIdx = this.state.data.findIndex(post => post.id === intId);
    if (elemIdx !== -1) {
      const newData = [...this.state.data];
      newData[elemIdx].title = newTitle;
      newData[elemIdx].body = newText;
      this.setState({data: newData});
    }

  }

  renderModalWindow = () => {
    if (this.state.editingPostId !== undefined) {
      const intId = parseInt(this.state.editingPostId);
      const post = this.state.data.filter(post => post.id === intId);
      return (
        <Modal 
          setModalWindowInactiveFnc={this.setModalWindowInactive}
          editPostFnc={this.editPost}
          post={post[0]}
        />
      );
    }
    return null;
  }

  render() {

    return (
      <React.Fragment>
            <h2 >Posts</h2>
            {this.renderPosts()}
            {this.renderModalWindow()}
      </React.Fragment>
    );
  }
}

export default App;
