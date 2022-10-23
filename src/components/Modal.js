import '../styles/Modal.css';
import React from 'react';


class Modal extends React.Component {
    constructor() {
      super();
    }

  
    render() {
      return (
            <div class="modal">
                <div class="modal__block">
                    <h3>Enter new data</h3>
                    <form className='modal__form'>
                        <label className='modal__label' for='title'>Modify title</label>
                        <input className='modal__input' id='title'/>
                        <label className='modal__label' for='text'>Modify text</label>
                        <input className='modal__input' id='text'/>
                        <button className='modal__submit'>Save changes</button>
                    </form>
                    <button class="modal__close">✘</button>
                </div>
            </div>
      );
    }
}

export default Modal;