import '../styles/Modal.css';
import React from 'react';


class Modal extends React.Component {
    constructor() {
      super();
    }

    handleModalClose = () => {
        this.props.setModalWindowInactiveFnc.call(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const postId = this.props.post.id;
        const newTitle = event.target.elements.title.value;
        const newText = event.target.elements.text.value;
        this.props.editPostFnc.call(this, postId, newTitle, newText);
        this.handleModalClose();
    }
  
    render() {
      return (
            <div className='modal'>
                <div className='modal__block'>
                    <h3>Editing post №{this.props.post.id}</h3>
                    <form className='modal__form' onSubmit={this.handleSubmit}>
                        <label className='modal__label' htmlFor='title'>Modify title</label>
                        <input className='modal__input_title' id='title' defaultValue={this.props.post.title} name="title"/>
                        <label className='modal__label' htmlFor='text'>Modify text</label>
                        <textarea  className='modal__input_text' id='text' defaultValue={this.props.post.body} name="text"/>
                        <button className='modal__submit'>Save changes</button>
                    </form>
                    <button onClick={this.handleModalClose} className='modal__close'>✘</button>
                </div>
            </div>
      );
    }
}

export default Modal;