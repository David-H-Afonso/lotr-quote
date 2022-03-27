import './App.css';
import React, { useEffect, useState } from 'react' 

function App () {
  const [cita,setQuote] = useState()
  const [personaje,setCharacter] = useState()
  const [birth,setBirth] = useState()
  const [death,setDeath] = useState()
  const [gender,setGender] = useState()
  const [race,setRace] = useState()

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ZDSEjlatrGShRDC_9C60'
    }

    const fetchData = async () => {
      const citasEnCrudo = await fetch("https://the-one-api.dev/v2/quote?limit=2390",{headers:headers});
      const citas = await citasEnCrudo.json();
      const cita = citas.docs[Math.floor(Math.random() * citas.docs.length)]
      setQuote(cita.dialog)
      const personaje = await fetch("https://the-one-api.dev/v2/character?_id=" + cita.character,{headers:headers});
      const nombrePersonaje = await personaje.json()
      console.log(nombrePersonaje)
      if(nombrePersonaje.docs[0].name === "MINOR_CHARACTER"){
        setCharacter("Unown/Minor Character")
        setBirth("Unown")
        setDeath("Unown")
        setGender("Unown")
        setRace("Unown")
      } else {
        setCharacter(nombrePersonaje.docs[0].name)
        setBirth(nombrePersonaje.docs[0].birth)
        setDeath(nombrePersonaje.docs[0].death)
        setGender(nombrePersonaje.docs[0].gender)
        setRace(nombrePersonaje.docs[0].race)
      }
    }

    fetchData();
  }, []);


  return(
    
    <div id='main'>
      <div id='quote'>
        <blockquote>{cita}</blockquote>
        <div id='divCita'><cite>- {personaje}</cite></div>
        <ul>
          <li>Date of birth: {birth}</li>
          <li>Gender: {gender}</li>
          <li>Race: {race}</li>
          <li>Date of death: {death}</li>
        </ul>
      </div>
    </div>
  )
}

export default App;
