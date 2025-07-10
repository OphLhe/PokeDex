import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";


const EvolveCard = ({name}) => {
const [evoPicture, setEvoPicture] = useState([]);
// const [frenchName, setFrenchName] = useState(true);

const fetchEvolve = async ()=>{

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setEvoPicture(response.data.sprites.other["home"].front_default);        
    } catch (error) {
        console.error("Error fetching pokemon specifications:", error);
    }

};
// const fetchFrenchName = async () => {
//     try {
//       const resFrench = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//       setFrenchName(resFrench.data.names[4].name);
//       console.log("resFrench", resFrench.data.names[4].name);
//     } catch (error) {
//       console.error("error fetching french name:", error);
//     }
//   }

 useEffect(() => {
    fetchEvolve();
    // fetchFrenchName();
}, []);

return <>

    <div className="evolveCard">
      <Card>
        <Card.Img className = 'cardImage'  src={evoPicture}/>
        <Card.Body >
          <Card.Title className="cardTitle">{name.toUpperCase()}</Card.Title>
        </Card.Body>
      </Card>
    </div>
   </>

};

export default EvolveCard; 
