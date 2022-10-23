import './App.css';
import React from 'react';
import Post from './components/Post';
import Modal from './components/Modal';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      editingPostId: undefined,
      data : [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        }
      ]
    }
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
