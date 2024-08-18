import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SimpleCarousel from './globals/Carouse/Carousel';
import './homee.css';

const ExtraImgs = ({ ELEMENT }) => {
    if (ELEMENT) {
        return (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {ELEMENT.map(per => (

                    <Grid item xs={2} sm={4} md={4} key={per.index}>
                        <img
                            // className="imgStyle"
                            src={per.image}
                            alt=""
                        />
                    </Grid>
                ))}
            </Grid>
            // ELEMENT.map(per => (
            //     <div className="grid-item" key={per.image}>
            //         <div >
            //             {/* <img
            //                 className="imgStyle"
            //                 src={encodeURI(`http://localhost:9999/load_image/?img=${per.image}&&type=${per.category_id}`)}
            //                 alt=""
            //             /> */}
            //             <img
            //                 className="imgStyle"
            //                 src={per.image}
            //                 alt=""
            //             />
            //         </div>
            //     </div>
            // ))
        );
    } else {
        return (<div></div>);
    }
};

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
};

const slideImages = [
    { image: require('../src/globals/Carouse/uplds/villa_1.jpg') },
    { image: require('../src/globals/Carouse/uplds/villa_2.jpg') },
    { image: require('../src/globals/Carouse/uplds/kfc_qalqilya.jpg') },
    { image: require('../src/globals/Carouse/uplds/cedarz.JPG') },
    { image: require('../src/globals/Carouse/uplds/school.JPG') },
    { image: require('../src/globals/Carouse/uplds/pizza_hut.JPG') },
];

const arabexSlideImages = [
    { url: require('../src/globals/Carouse/uplds/cedarz.JPG') },
    { url: require('../src/globals/Carouse/uplds/school.JPG') },
    { url: require('../src/globals/Carouse/uplds/pizza_hut.JPG') },
];

const Slideshow = () => {
    return (
        <div className="slide-container">
            <SimpleCarousel carouselList={arabexSlideImages} />
        </div>
    );
};

const Home = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const mainUrl = "http://:::9999";

    useEffect(() => {
        const fetchData = async () => {
            const url = `${mainUrl}/?type=homeimages`;
            console.log("URL: " + url);
            alert('Hello');
            let response = await fetch(url);
            let data = await response.json();
            setPersons(data);
            setLoading(false);
        };
        //  fetchData();
    }, []);

    return (
        <div>
            <Slideshow />
            <div className="grid-container">
                <ExtraImgs ELEMENT={slideImages} />
            </div>
        </div>
    );
};

export default Home;
