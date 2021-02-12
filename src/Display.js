
import React from 'react';
import archh from './archh.jpg'
import  './Display.css'
//import ReactDOM from 'react-dom';
// Usually we use one component per file, here we have more
import { MeventEmitter, url_g, User_g } from './globals.js'
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css';

class Display extends React.Component {

    render() {
        return (<div>

<div class="polaroid">
  <img src={archh} />
  <div class="container">
  <p>Northern Lights</p>

  </div>
</div>

<div class="polaroid">
  <img class="wid"src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=architecture-building-driveway-186077.jpg&fm=jpg" />
  <p> first project</p>

  <div class="container">
  </div>
</div>



<div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>



        </div>);
    }
}
export default Display;