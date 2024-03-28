import '../public/App.css'
import Register from './components/Register';
import Login from './components/Login';


// let isLogin = false;
let isRegistered = false;
  
function App() {

  return (

    <div className="container">
      {/* {isLogin ? <h1>Hello</h1> : <Login /> } */}
      { isRegistered ? <Login /> : <Register />}
    </div>

  )
}

export default App
