import React from 'react'

const year = new Date().getFullYear();
console.log("The year footer value is: ", year);

function Footer() {
   return (
        <div>
           <footer> <p>Copyright {year}</p> </footer>
        </div>
    )
};

export default Footer