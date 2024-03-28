import Form from "./Form"
import Input from "./Input"

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <Form 
                type = {
                <div>
                    <Input input="Username" />
                    <Input input="Password" />
                </div>
                }
                submit = "Login"
            /> 
        </div>  
    )
}

export default Login;
 

