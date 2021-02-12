
import React from 'react';
import archh from './archh.jpg'
//import ReactDOM from 'react-dom';
// Usually we use one component per file, here we have more
import { MeventEmitter, url_g, User_g } from './globals.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt, Route } from 'react-router-dom';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
  import{
faEnvelope,
  }from "@fortawesome/free-regular-svg-icons";
import GR from './GR.jpg';
import './gallery.css'

import Elem from './Elem'
import Home from './Home'

const Contact = () => (
    <div style={{
        display: "flex",

        width: "100%",
        backgroundImage: `url(${GR})`,
        justifyContent: "center",
        alignItems: "center",
        //   backgroundColor: "rgb(250, 235, 215)",
        height: 500
    }}
    >
        <div

            style={{
                display: "inline-block",
                height: 400,
                width: "75%",
                backgroundColor: "#e2e7ec",/* fallback color */
                background: "#e2e7ec",
                opacity: 0.8,

            }}

        >
            <p style={{
                fontSize: "1.4em",

                marginTop: "14px",

                marginLeft: "10px",
            }}>Contact Us
            </p>
            <pre >{
                ` Michael Graves Architecture & Design
 341 Nassau St.
 Princeton, NJ 08540`}
            </pre>
<SocialFollow />            
        </div>
    </div>
);
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);

function SocialFollow() {
    return (
      <div className="social-container">
        <a
          href="https://www.youtube.com/c/jamesqquick"
          className="youtube social"
        >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a
          href="https://www.facebook.com/Arabex-Arab-Experts-For-Architecture-Consultations-377223399037285/"
          className="facebook social"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com/jamesqquick" className="twitter social">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://www.instagram.com/learnbuildteach"
          className="instagram social"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <br></br>
        <a  href="mailto:arabex.eng@gmail.com"
          className="social"> 

        <FontAwesomeIcon  icon={faEnvelope} size="2x" /> 
        arabex.eng@gmail.com
        </a>
      </div>
    );
}
class Conservation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainUrl: "http://127.0.0.1:9999",
            persons: [],
            index: 0,
            img: null

        }
        this.passData = this.passData.bind(this);

    }


    async componentDidMount() {
        var url = this.state.mainUrl + "/";
        console.log("DSd");
        let response = await fetch(url)
        let data = await response.json();
        this.setState({ persons: data, loading: false });

    }
    passData(name, ID, img, area, year) {
        this.props.history.push({
            pathname: '/Elem',
            state: { name: name, id: ID, image: img, area: area, year: year }//has nothing with component state
        })
    }

    render() {

        let url2 = this.state.mainUrl + "/load_image/?img=";
        const list = this.state.persons.map(person => (

            <div key={person.ID}  >
                <div class="col-sm" >
                    <div class="wid">
                        <img src={encodeURI(url2 + `${person.image}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}`), person.area, person.year)} />
                        <p>mt5lls ya 3m :)</p>
                    </div>
                </div>

            </div>


        )

        )

        const ListGrid = () => {

            const result = this.state.persons.map((x, i) => {
                return i % 4 === 0 ? this.state.persons.slice(i, i + 4) : null;
            }).filter(x => x != null);

            return (
                <div>
                    {result.map((result, index) => {
                        return (<section class="row" key={index}>
                            {result.map(person => <span class="col-sm" >< img class="wr" src={encodeURI(url2 + `${person.image}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}`), person.area, person.year)} />
                                <h2><span class="editTxt">Bottom Left</span></h2>
                                <br></br>
                            </span>
                            )}
                        </section>);
                    })}
                </div>
            );
        }


        return (

            <div >
                {/*}  <div class="row">{list}</div>*/}

                <div class="container"> <ListGrid /> </div>

                
                <ColoredLine color="rgb(128, 41, 41)" />
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                           <p class="row">Learn more about our team!</p> 
                        </div>
                        <div class="col-sm">
                        </div>
                        <span className="vline"></span>
                        <div class="col-sm"/>

                        <div class="col-sm">
                            <button >meet our team!</button>
                            <div class="row"><br></br></div>
                            <button>Connect with us!</button> 

                        </div>                 
                    </div>
                    <div class="row"></div>

                </div>
                <Contact />

            </div>);
    }


}
export default withRouter(Conservation);