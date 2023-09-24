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
            <input
              type='text'
              id='key'
              placeholder="Enter your key here ..."
              value={key} // Bind the input value to the state
              onChange={(e) => setKey(e.target.value)} // Update the state on input change
              required
            />
            <button type="submit">Go to ChatRoom</button>
        </form>
    );
}

export default Login;