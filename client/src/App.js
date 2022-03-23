import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RouterComponent } from "./components/Router/Router";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 3,
      width: 2,
    }}
  />
);

class App extends React.Component {
  state = {
    v: 7,
    appear: false,
    cls: "row",
  };

  changeStyle() {
    //alert('dd');

    let v = this.dropdown.style.display;
    //alert (" "+v+" ,:"+nv)
    let nv = v === "block" ? "none" : "block";

    this.dropdown.style.display = nv;
    //let vert = !this.state.vert;
    //let cls = !vert ? 'block' : 'none';
    //this.setState({vert:vert,cls:cls})
  }
  render() {
    let cls = this.state.cls; //?

    return <RouterComponent />;
  }
}
export default App;
