import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isLoginModalOpen: boolean;
    closeLoginModal: () => void;
    onSignUpClick: () => void;
}

// isLoginModalOpen is boolean, the rest are functions
const LoginModal = ({isLoginModalOpen, closeLoginModal, onSignUpClick}: LoginModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    if (!isLoginModalOpen) {
        return null;
    }

    console.log("Login pop up opening")

    // Leaving this here for learning
    // Putting this here would cause an error because this is after an if statement (so it is rendered conditionally)
    // hooks cannot be rendered conditionally
    // const navigate = useNavigate();

    const handleLoginSubmit = (e: React.FormEvent) => {

        // This to prevent the default javascript behaviour of reloading the whole page when the form is submitted
        // reloading is refreshing the page
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        console.log("Login button pressed");

        axios.post("http://localhost:3001/api/login", userData)
        .then(res => {
            if (res.data.status === "ok") {
                // Placing this here in an if/else is fine
                // navigate('/');
                alert("Log in successful");
                closeLoginModal();
            } else {
                setErrorMessage("Password is incorrect");
            }
        })
        .catch(e => console.error(e.message));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
                <button
                type="button"
                className="absolute right-2 top-2"
                onClick={closeLoginModal}
                >
                <X className="h-4 w-4" />
                </button>
                <form className="p-6 space-y-4" onSubmit={handleLoginSubmit}>
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
                <div className="space-y-2">
                    <div className="text-left text-black">Email</div>
                    <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white px-4 py-2 rounded-md text-black focus:ring-0 border-2"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <div className="text-left text-black">Password</div>
                    <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white px-4 py-2 rounded-md text-black focus:ring-0 border-2"
                    required
                    />
                </div>
                <button type="submit" className="w-full">
                    Login
                </button>

                {/* Show error message if password is incorrect */}
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

                <div className="text-black text-sm">
                    Don't have an account? Click <a className="text-blue-500 hover:underline cursor-pointer" onClick={onSignUpClick}>here</a> to sign up
                </div>
            </form>     
            </div>
        </div>
    );
};

export default LoginModal;