import './App.css'
import emojipedia from './components/Emojipedia';

function loopingEmoji(element) {
  return (element.meaning).substring(0, 100);
} 

var emojiMean = emojipedia.map(loopingEmoji);
console.log(emojiMean);


function App() {


  return (
    
    <>
      
    </>
  )
}

export default App
