import '../public/App.css'
import Input from './components/Input';
import Form from './components/Form';


let isLogin = false;

function loginOrNot() {
  if (isLogin) {
    return <h1>Hello</h1>
  } else {
    return (
      <Form 
        type = {
          <div>
            <Input input="Username" />
            <Input input="Password" />
          </div>
        }
        submit = "Login"
      />    
    )
  }
}

function App() {

  return (

    <div className="container">
      {loginOrNot()}
    </div>

  )
}

export default App
