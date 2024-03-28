import Form from "./Form"
import Input from "./Input"

function Register() {
    return (
        <div>
            <h1>Register</h1>
            <Form 
                type = {
                    <div>
                        <Input input="Username" />
                        <Input input="Password" />
                        <Input input="Confirm Password" />
                    </div>
                }
                submit = "Register"
            />   
        </div>
    )
}

export default Register;