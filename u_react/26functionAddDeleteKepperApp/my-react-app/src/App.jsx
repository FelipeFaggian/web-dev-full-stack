import { useState } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import "./App.css"


//CHALLENGE:
//1. Implement the add note functionality. OK
//- Create a constant that keeps track of the title and content. OK
//- Pass the new note back to the App.OK
//- Add new note to an array. OK
//- Take array and render seperate Note components for each item. OK

//2. Implement the delete note functionality. OK
//- Callback from the Note component to trigger a delete function. OK
//- Use the filter function to filter out the item that needs deletion. OK 
//- Pass a id over to the Note component, pass it back to the App when deleting. OK

//This is the end result you're aiming for:
//https://pogqj.csb.app/

function App() {

  const [inputText, setInputText] = useState({
    title: "",
    content: ""
});
  const [items, setItems] = useState([]);

  const handleChange = e => {const { name, value } = e.target; setInputText(prevState => ({...prevState,[name]: value })); console.log("On handle change function!")};
  let countId = 0;
  function addItem(e) {
    setItems([
      ...items,  
      { id: countId++, title: inputText.title, content: inputText.content }
    ]);
    console.log("addItem funtion triggered!")
    inputText.title =  "";
    inputText.content =  "";
    e.preventDefault();
  };

  function deleteItem(id) {
    console.log("deleteItem function triggered!");
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea titleInput={handleChange} titleValue={inputText.title} contentInput={handleChange} contentValue={inputText.content} addItem={addItem}/>
        {items.map(e => (
        <Note key={e.id} title={e.title} content={e.content} deleteItem={() => deleteItem(e.id)}/>
        ))}
      <Footer />
    </div>
  );
}

export default App;
