import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";



const About = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const center = useMemo(() => ({ lat: 14.405826, lng: 120.845004 }), []);
     
	
    return (
        <> 
        <div className="about">
            <div id="aboutdiv">
            <p>Our professional approach and continual development has led us to becoming the leading provider of professional music education.</p>
            <p>We combine innovative, fun and creative ways to teach music and engage with students to reach their full potential. Innovative music lessons and classes from beginner through advanced for children, teens, and adults. We are the best music school for you. We have programs to suit everyone’s needs. We are the only professional music school offering lessons for children, adults and seniors.</p>
            <p>We are located at 065 Callejon 13 St, Julugan 8, Tanza, Cavite. See below:</p>
            </div>
        </div>
        <br />
        <div className="App">
        {!isLoaded ? (<h1>Loading...</h1>) : (
            <GoogleMap mapContainerClassName="map-container" center={center} zoom={17}>
                <Marker position={{ lat: 14.405826, lng: 120.845004 }} />
            </GoogleMap>
        )}
        </div>
        </>
	);
};

export default About;
