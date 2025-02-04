import { useState } from 'react';
import { toast } from "react-toastify";
import { X } from 'lucide-react';
import axios from 'axios';

interface SignUpModalProps {
    isSignUpModalOpen: boolean;
    closeSignUpModal: () => void;
    onLoginClick: () => void;
}

const SignUpModal = ({isSignUpModalOpen, closeSignUpModal, onLoginClick}: SignUpModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    if (!isSignUpModalOpen) {
        return null;
    }
    console.log("Sign In pop up opening")

    // Leaving this here for learning
    // Putting this here would cause an error because this is after an if statement (so it is rendered conditionally)
    // hooks cannot be rendered conditionally
    // const navigate = useNavigate();

    // Password validation function
    const isPasswordValid = (password: string): boolean => {
        // At least 8 characters long
        // Contains at least one uppercase letter
        // Contains at least one lowercase letter
        // Contains at least one number
        // Contains at least one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+}{":?><`~';,.=-]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSignUpSubmit = (e: React.FormEvent) => {

        // This to prevent the default javascript behaviour of reloading the whole page when the form is submitted
        // reloading is refreshing the page
        e.preventDefault();

        if (!isPasswordValid(password)) {
            setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            return;
        }

        if (password != confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const userData = {
            email,
            password,
        };

        console.log("Sign up button pressed");
        toast.success("Sign up button pressed. Please wait a moment!");

        axios.post("https://emailly-1.onrender.com/api/signup", userData)
        .then(res => {
            if (res.data.status === "ok") {
                // Placing this here in an if/else is fine
                // navigate('/');
                toast.success("Sign Up successful");
                localStorage.setItem("userEmail", email);
                closeSignUpModal();
            } else {
                setErrorMessage(res.data.data);
            }
        })
        .catch(e => {
            console.error(e.message);
            toast.error("Error creating account");
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
                <button
                type="button"
                className="absolute right-2 top-2"
                onClick={closeSignUpModal}
                >
                <X className="h-4 w-4" />
                </button>
                <form className="p-6 space-y-4" onSubmit={handleSignUpSubmit}>
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign Up</h2>
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
                <div className="space-y-2">
                    <div className="text-left text-black"> Confirm Password</div>
                    <input
                    id="password"
                    type="password"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white px-4 py-2 rounded-md text-black focus:ring-0 border-2"
                    required
                    />
                </div>
                <button type="submit" className="w-full">
                    Register
                </button>

                {/* Show error message if passwords don't match */}
                {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

                <div className="text-black text-sm">
                    Already have an account? Click <a className="text-blue-500 hover:underline cursor-pointer" onClick={onLoginClick}>here</a> to log in
                </div>
            </form>     
            </div>
        </div>
    );
};

export default SignUpModal;