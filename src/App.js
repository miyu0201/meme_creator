

import React,{useState} from "react"
import './App.css'
import logo from "./image/meme_logo.png"
export default function App() {

  function Header(){
        return (
          <header className="header">
            <img 
                src={logo}
                className="header--image"
                alt="logo"
            />
            <h2 className="header--title">Meme Creator</h2>
            <h4 className="header--sub">For Meme Enjoyers</h4>
        </header>
        )
  }

  function Meme(){
    const [image, setImage]= useState("")
    const [quote, setQuote]= useState("hi")
    const [meme, setMeme]= useState({
      text: "",
      randomImage: "https://i.imgflip.com/261o3j.jpg" 
    })

//fetch data from api, save value in state
    React.useEffect( function() {
      fetch("https://api.imgflip.com/get_memes")
         .then(res => res.json())
         .then(data => setImage(data))     
     fetch("https://dummyjson.com/quotes")
          .then(res => res.json())
         .then(data => setQuote(data))    
  },[])

  function GetImage(){
       const imageArray = image.data.memes
       //get a random index number
      const randomNumber = Math.floor(Math.random() * imageArray.length)
      //get the url of that item
        const url = imageArray[randomNumber].url
        //use the random url to get a random image
      setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
//set input field empty everytime get a new image
       setMeme(prevState=>{
          return{
            ...prevState,
            text: "",       
          }
        })
       
  }



  function GetQuote(){
    const quoteArray = quote.quotes
    //get a random index number
   const randomNumber = Math.floor(Math.random() * quoteArray.length)
   //get the quote of that item
     const quoteText = quoteArray[randomNumber].quote
     setMeme(prevMeme => ({
      ...prevMeme,
      text: quoteText
  }))
}

console.log(quote)
console.log(meme)
    function handleChange(e){
        setMeme(prevState=> {
          return{
            ...prevState,
            [e.target.name]:e.target.value
          }
        })
    }

//console.log(meme)
     return(
     
        <main>   
            <div className="form">
            <button  className="form--button" onClick={GetImage}>  Get new meme image </button>
            <button  className="form--button" onClick={GetQuote}>  Get random quote </button>
                <input 
                    type="text"
                    placeholder="Input meme text..."
                    className="form--input"
                    name="text"
                    value={meme.text}
                    onChange={handleChange}
                />
                
            </div>
         
            <div className="meme">
              <img  className="meme--image" src = {meme.randomImage} alt="meme"/>
              <h2 className="meme--text top">{meme.text}</h2>           
            </div> 
        </main>
       
     )
  }

    return (
        <div>
            <Header/>
            <Meme/>     
        </div>
    )
}
