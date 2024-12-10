import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthInput from "@/components/common/auth/AuthInput";
import AuthButton from "@/components/common/auth/AuthButton";
import { UserPlus } from "lucide-react";
import { User } from "@/types";

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
      console.log("Response after SignUp", res);
      alert("Sign up successful!, Created User with email: " + res.email);
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

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useAuth } from "@/hooks/useAuth";

// interface SignUpFormInputs {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignUp: React.FC = () => {
//   const { signUp } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormInputs>();

//   const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
//     try {
//       await signUp(data);
//       alert("Sign up successful!");
//     } catch (error) {
//       alert("Sign up failed!");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
//     >
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Name"
//           {...register("name", { required: "Name is required" })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//         />
//         {errors.name && (
//           <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <input
//           type="email"
//           placeholder="Email"
//           {...register("email", { required: "Email is required" })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//         />
//         {errors.email && (
//           <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password", { required: "Password is required" })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
//         />
//         {errors.password && (
//           <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
//       >
//         Sign Up
//       </button>
//     </form>
//   );
// };

// export default SignUp;
