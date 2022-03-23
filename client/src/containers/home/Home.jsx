import React from "react";
import ExtraProjects from "../../components/ExtraProjects/ExtraProjects";
import Slideshow from "../../components/Slider/Slider";
import { mainUrl } from "../../globals";
import "./homee.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appeardara: false,
      loading: true,
      persons: [],
      productTemp: [],
    };
  }
  async componentDidMount() {
    let url = mainUrl + `/?type=homeimages`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({ persons: data, loading: false });
  }
  render() {
    return (
      <div>
        <Slideshow />
        xc
        <div className="grid-container">
          <ExtraProjects projects={this.state.persons} />
        </div>
      </div>
    );
  }
}
export default Home;
