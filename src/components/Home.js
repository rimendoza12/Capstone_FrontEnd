import React from 'react';

const Home = () => {
	return (
        <>
        <div className="homeintro">
            <div>
                <img src={require('./images/les1.jpg')}  alt="" className="home-img"/>
            </div>
            <div className="hometxt">
                <p className="title">Music for Everyone</p>    
                <p>Arellano Music Studio is a Band Rehearsal Studio equipped with a basic band set-up in a sound-contained, safe & friendly space for bands to rehearse. 
                    We offer a safe, private and gated location with FREE PARKING for our clients.</p>
                <p>Arellano Music Studio also offers one-on-one Music Lessons for Drums, Guitar, Piano, and Voice for both ONLINE and FACE-TO-FACE learning. </p>
                <p>We pride ourselves on having affordable rates, without having to sacrifice the quality of service or the quality of education. </p>
            </div>
            <div>
                <img src={require('./images/les3.jpg' )} alt=""  className="home-img"/>
            </div>
        </div>
        </> 
	);
};

export default Home;