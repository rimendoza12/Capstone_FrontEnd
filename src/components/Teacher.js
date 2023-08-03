import React from 'react';

const Teacher = () => {
	return (
        <div class="teacher">   
            <div class="teacherImg">     
                <img src={require('./images/voice.jpg')} alt=''/>
                <br /><span className="Rate">Vina Krizia Arellano</span>
                <br /><span className="Description">Voice, Piano</span>
            </div>
            <div class="teacherImg">     
                <img src={require('./images/guitars.jpg')} alt=''/>
                <br /><span className="Rate">Ocho Toleran</span>
                <br /><span className="Description">Guitar</span>
            </div>
            <div class="teacherImg">     
                <img src={require('./images/bass.jpg')} alt=''/>
                <br /><span className="Rate">Karel Honasan</span>
                <br /><span className="Description">Bass</span>
            </div>
            <div class="teacherImg">     
                <img src={require('./images/drums.jpg')} alt=''/>
                <br /><span className="Rate">Macoy Manuel</span>
                <br /><span className="Description">Drums</span>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div> 
	);
};

export default Teacher;