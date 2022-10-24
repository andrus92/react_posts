import './App.css';
import React from 'react';
import Post from './components/Post';
import Modal from './components/Modal';
import Notification from './components/Notification';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      editingPostId: undefined,
      notificationStatus: undefined,
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

  setModalWindowActive = (id) => {
    this.setState({editingPostId: id});
  }

  setModalWindowInactive = () => {
    this.setState({editingPostId: undefined});
  }

  setNotificationStatus = (status) => {
    this.setState({notificationStatus: status});
  }

  removePost = (id) => {
    const intId = parseInt(id);
    fetch(`https://jsonplaceholder.typicode.com/posts/${intId}`, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then((json) => {
        const newData = this.state.data.filter(post => post.id !== intId);
        this.setState({data: newData});
        this.setNotificationStatus(true);
      })
      .catch((err) => {
        console.error(err);
        this.setNotificationStatus(false);
      });
  }

  editPost = (id, newTitle, newText) => {
    const intId = parseInt(id);
    const elemIdx = this.state.data.findIndex(post => post.id === intId);
    if (elemIdx !== -1) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${intId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: intId,
          title: newTitle,
          body: newText,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        const newData = [...this.state.data];
        newData[elemIdx].title = newTitle;
        newData[elemIdx].body = newText;
        this.setState({data: newData});
        this.setNotificationStatus(true);
      })
      .catch((err) => {
        console.error(err);
        this.setNotificationStatus(false);
      });
    }
  }

  renderPosts = () => {

    return (
      <ul className='posts'>
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

  renderNotification = () => {

    if (this.state.notificationStatus !== undefined) {
        return (
          <Notification 
            notificationStatus={this.state.notificationStatus}
            setNotificationStatusFnc={this.setNotificationStatus}
          />
        );
    }

    return null;
  }

  render() {

    return (
      <React.Fragment>
            {this.renderPosts()}
            {this.renderModalWindow()}
            {this.renderNotification()}
      </React.Fragment>
    );
  }
}

export default App;
