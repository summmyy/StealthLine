import { useState } from "react";

const Login = () => {

    // State to store the input value
    const [key, setKey] = useState("");

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Set the input value in LocalStorage
        localStorage.setItem("userKey", key);
        // Redirect to the '/chat' page
        window.location.href = "/chat";
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome to Stealth-Line Chat</h2>
            <div className="form-group">
                <label>Enter your friend invitation</label><br></br>
                <input className="form-control is-valid"
                type='text'
                id='key'
                placeholder="invitation link here ..."
                value={key} // Bind the input value to the state
                onChange={(e) => setKey(e.target.value)} // Update the state on input change
                required
                />
            </div><br></br>
            <button type="submit">Go to ChatRoom</button>
        </form>
    );
}

export default Login;