import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';

import Modal from 'react-modal';

const appRoot = document.getElementById('app-root');
// const modalRoot = document.getElementById('modal-root');

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.el = document.createElement('div');
//   }

//   componentDidMount() {
//     modalRoot.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     modalRoot.removeChild(this.el);
//   }

//   render() {
//     return ReactDOM.createPortal(
//       this.props.children,
//       this.el,
//     );
//   }
// }

// export default Modal
Modal.setAppElement(appRoot)
ReactDOM.render(<Provider store = {store} ><App/></Provider>, appRoot);

registerServiceWorker();
