import '../styles/Notification.css';
import React from 'react';
import smiley_face from '../img/icons8-smiling-face-with-smiling-eyes-48.png';
import frowning_face from '../img/icons8-slightly-frowning-face-48.png';


class Notification extends React.Component {
    constructor() {
      super();
    }

    handleCloseNotification = () => {
      this.props.setNotificationStatusFnc.call(this, undefined);
    }
    
    renderNotification = () => {
      if (this.props.notificationStatus) {
        return (
            <div className='notification'>
                <div className='notification__block notification__block_success'>
                  <h4>The operation has been completed successfully</h4>
                  <div className='notification__img'>
                    <img src={smiley_face}></img>
                  </div>  
                  <button onClick={this.handleCloseNotification} className='notification__btn'>Continue</button>
                </div>
            </div>
        );
      }
      
      return (
        <div className='notification'>
            <div className='notification__block notification__block_failure'>
              <h4>Something went wrong</h4>
              <div className='notification__img'>
                <img src={frowning_face}></img>
              </div>  
              <button onClick={this.handleCloseNotification} className='notification__btn'>Try it again</button>
            </div>
        </div>
      );
    }

    render() {
      return (
        <React.Fragment>
          {this.renderNotification()}
        </React.Fragment>
      );
    }
}

export default Notification;