
function Form(props) {
   return (
        <form className="form">
            {props.type}
            <button type="submit">{props.submit}</button>
        </form>
    )
}

export default Form;