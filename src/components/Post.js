import '../styles/Post.css';
import React from 'react';


class Post extends React.Component {
    constructor() {
      super();
    }

    handleEditPost = () => {
        console.log('editPos')
    }
    
    handleRemovePost = (event) => {
        const id = event.target.closest('li').id;
        this.props.removePostFnc.call(this, id);
    }
  
    render() {
      return (
            <li className='post' id={this.props.id}>
                 <span className='post__id'>{this.props.id}</span>
                 <span className='post__title'>{this.props.title}</span>
                 <span className='post__body'>{this.props.body}</span>
                 <div className='post__btns'>
                    <button onClick={this.handleEditPost} className='post__btn'>Edit</button>
                    <button onClick={this.handleRemovePost} className='post__btn'>Remove</button>
                 </div>
            </li>
      );
    }
}

export default Post;