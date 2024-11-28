// import React, { useState } from 'react';
// import { X, Mail, Lock, User } from 'lucide-react';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: 'login' | 'signup';
// }

// export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle authentication here
//     console.log({ email, password, name });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="h-5 w-5" />
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           {type === 'login' ? 'Welcome Back!' : 'Create Account'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {type === 'signup' && (
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 required
//               />
//             </div>
//           )}

//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
//           >
//             {type === 'login' ? 'Log In' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           {type === 'login' ? (
//             <>
//               Don't have an account?{' '}
//               <button
//                 onClick={() => {
//                   onClose();
//                   setTimeout(() => document.querySelector<HTMLButtonElement>('[data-signup-button]')?.click(), 100);
//                 }}
//                 className="text-orange-500 hover:text-orange-600"
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button
//                 onClick={() => {
//                   onClose();
//                   setTimeout(() => document.querySelector<HTMLButtonElement>('[data-login-button]')?.click(), 100);
//                 }}
//                 className="text-orange-500 hover:text-orange-600"
//               >
//                 Log in
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: 'login' | 'signup';
// }

// export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ email, password, name });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fadeIn">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="h-5 w-5" />
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           {type === 'login' ? 'Welcome Back!' : 'Create Account'}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {type === 'signup' && (
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
//                 required
//               />
//             </div>
//           )}

//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
//               required
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               // Dynamically change the input type based on the showPassword state
//               type={showPassword ? 'text' : 'password'} // Toggle between 'password' and 'text'
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
//               required
//             />
//             {/* Eye icon to toggle password visibility */}
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)} // This will toggle the showPassword state
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               {/* Show eye icon when password is hidden, hide when visible */}
//               {showPassword ? (
//                 <Eye className="h-5 w-5" />
//               ) : (
//                 <EyeOff className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
//           >
//             {type === 'login' ? 'Log In' : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           {type === 'login' ? (
//             <>
//               Don't have an account?{' '}
//               <button
//                 onClick={() => {
//                   onClose();
//                   setTimeout(() => document.querySelector<HTMLButtonElement>('[data-signup-button]')?.click(), 100);
//                 }}
//                 className="text-orange-500 hover:text-orange-600"
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button
//                 onClick={() => {
//                   onClose();
//                   setTimeout(() => document.querySelector<HTMLButtonElement>('[data-login-button]')?.click(), 100);
//                 }}
//                 className="text-orange-500 hover:text-orange-600"
//               >
//                 Log in
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const endpoint = type === 'login' ? 'user/login' : 'user/signup';
    const endpoint = type === 'login' ? 'http://localhost:3000/user/login' : 'http://localhost:3000/user/signup';

    const payload = type === 'signup' ? { name, email, password } : { email, password };

    if (!email.includes('@') || password.length < 6) {
      setError('Invalid email or password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response Data:', data);
      if (response.ok) {
        alert(`${type === 'login' ? 'Logged in' : 'Signed up'} successfully`);
        onClose();
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Network error:', err); // Log the network error
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {type === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md ${
              loading
                ? 'bg-orange-300 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {loading ? 'Processing...' : type === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}


