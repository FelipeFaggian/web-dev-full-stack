import InfoContact from './infoContact'
import Avatar from './Avatar'

function Card(props) {
    return(
      <div className="card">
            <div className="top">
              <h2 className='name'>{props.name}</h2>
              <Avatar imgURL={props.imgURL}/>
            </div>
            <div className="bottom">
                <InfoContact info={props.id}/>
              <InfoContact info={props.phone}/>
              <InfoContact info={props.email}/>
            </div>
        </div>
      )
  }

  export default Card
  