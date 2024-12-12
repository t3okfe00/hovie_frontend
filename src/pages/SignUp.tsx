import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthInput from "@/components/common/auth/AuthInput";
import AuthButton from "@/components/common/auth/AuthButton";
import { UserPlus } from "lucide-react";
import { User } from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res: User = await auth?.signUp({ name, email, password });
      toast.success("Sign up successful!", { autoClose: 2000 });

      navigate("/login");
    } catch (err) {
      console.log("Error in SignUp", err);
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 my-5">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl ">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-orange-500 flex items-center justify-center bg-orange-100 rounded-full">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Create account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-orange-400 hover:text-orange-300"
            >
              Sign in
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <AuthInput
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong password"
          />

          <AuthButton type="submit" isLoading={isLoading}>
            Create account
          </AuthButton>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
