import {
    Link
}
from "react-router-dom";

function Home() {

    return (

        <div>

            <h1>
                Document Signature App
            </h1>

            <br />

            <Link to="/register">

                Register

            </Link>

            <br />
            <br />

            <Link to="/login">

                Login

            </Link>

        </div>
    );
}

export default Home;