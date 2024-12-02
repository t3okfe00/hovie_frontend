
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import social media icons

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Footer Content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul>
//               <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
//               <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
//               <li><a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a></li>
//               <li><a href="/terms" className="hover:text-orange-500">Terms of Service</a></li>
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">About</h3>
//             <p className="text-sm">
//               Hovie is your go-to platform for discovering, rating, and sharing your love for movies. Stay up-to-date with the latest releases and popular movies from around the world.
//             </p>
//           </div>

//           {/* Social Media Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaFacebook size={24} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaLinkedin size={24} />
//               </a>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaGithub size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//             <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates and movie recommendations directly to your inbox.</p>
//             <form className="flex space-x-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="p-2 w-2/3 rounded-md text-black"
//               />
//               <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
//           <p>© 2024 Hovie. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import social media icons
// import React, { useState } from 'react';

// const Footer = () => {
//   // State for email and message
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   // Handle email input change
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form behavior (page reload)

//     if (!email) {
//       setMessage('Please enter a valid email address.');
//       return;
//     }

//     // Example: Send email to a backend or API (this is just a placeholder)
//     try {
//       // Replace '/subscribe' with your actual API endpoint
//       const response = await fetch('/subscribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setMessage('Thank you for subscribing!');
//         setEmail(''); // Clear email input after success
//       } else {
//         setMessage('Something went wrong. Please try again.');
//       }
//     } catch (error) {
//       setMessage('Network error. Please try again later.');
//     }
//   };

//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Footer Content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul>
//               <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
//               <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
//               <li><a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a></li>
//               <li><a href="/terms" className="hover:text-orange-500">Terms of Service</a></li>
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">About</h3>
//             <p className="text-sm">
//               Hovie is your go-to platform for discovering, rating, and sharing your love for movies. Stay up-to-date with the latest releases and popular movies from around the world.
//             </p>
//           </div>

//           {/* Social Media Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaFacebook size={24} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaLinkedin size={24} />
//               </a>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaGithub size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//             <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates and movie recommendations directly to your inbox.</p>
//             <form className="flex space-x-2" onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="p-2 w-2/3 rounded-md text-black"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {message && <p className="mt-4 text-sm">{message}</p>}
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
//           <p>© 2024 Hovie. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import social media icons
// import React, { useState } from 'react';
// import emailjs from 'emailjs-com'; // Import EmailJS SDK

// const Footer = () => {
//   // State for email and message
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   // Handle email input change
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   // // Handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault(); // Prevent default form behavior (page reload)

//   //   if (!email) {
//   //     setMessage('Please enter a valid email address.');
//   //     return;
//   //   }

//   //   // Send email using EmailJS
//   //   try {
//   //     const response = await emailjs.send(
//   //       'service_tstkhy2',  // Replace with your EmailJS service ID
//   //       'template_et15xrf',  // Replace with your EmailJS template ID
//   //       { email: email },    // Send email address as the template variable
//   //       'JyYWf8nG6O9MDizrF'       // Replace with your EmailJS user ID
//   //     );

//   //     if (response.status === 200) {
//   //       setMessage('Thank you for subscribing!');
//   //       setEmail(''); // Clear email input after success
//   //     } else {
//   //       setMessage('Something went wrong. Please try again.');
//   //     }
//   //   } catch (error) {
//   //     setMessage('Network error. Please try again later.');
//   //   }
//   // };

  

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const email = e.target.email.value;  // Get the email entered by the user

//   try {
//     const response = await emailjs.send(
//       'service_tstkhy2',  // Replace with your actual Service ID
//       'template_et15xrf', // Replace with your actual Template ID
//       { email: email },    // Ensure these template params match your template placeholders
//       'JyYWf8nG6O9MDizrF'      // Replace with your actual API Key
//     );
//     console.log('SUCCESS!', response.status, response.text);
//   } catch (error) {
//     console.error('FAILED...', error);
//     alert('Something went wrong. Please try again later.');
//   }
// };


//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Footer Content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul>
//               <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
//               <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
//               <li><a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a></li>
//               <li><a href="/terms" className="hover:text-orange-500">Terms of Service</a></li>
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">About</h3>
//             <p className="text-sm">
//               Hovie is your go-to platform for discovering, rating, and sharing your love for movies. Stay up-to-date with the latest releases and popular movies from around the world.
//             </p>
//           </div>

//           {/* Social Media Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaFacebook size={24} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaInstagram size={24} />
//               </a>
//               <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaLinkedin size={24} />
//               </a>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
//                 <FaGithub size={24} />
//               </a>
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
//             <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates and movie recommendations directly to your inbox.</p>
//             <form className="flex space-x-2" onSubmit={handleSubmit}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="p-2 w-2/3 rounded-md text-black"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
//               >
//                 Subscribe
//               </button>
//             </form>
//             {message && <p className="mt-4 text-sm">{message}</p>}
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
//           <p>© 2024 Hovie. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import social media icons
import React, { useState, useRef } from 'react';  // Import useRef to access form inputs directly
import emailjs from 'emailjs-com';  // Import EmailJS SDK

const Footer = () => {
  // State for message (success/error message)
  const [message, setMessage] = useState('');

  // Create a reference for the email input field
  const emailRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;  // Get the email entered by the user

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_tstkhy2',  // Replace with your actual Service ID
        'template_ts6zqwh', // Replace with your actual Template ID
        { email: email },    // Ensure these template params match your template placeholders
        'JyYWf8nG6O9MDizrF'      // Replace with your actual API Key
      );

      if (response.status === 200) {
        setMessage('Thank you for subscribing!');
        emailRef.current.value = ''; // Clear the email input after success
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
      console.error('FAILED...', error);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/about" className="hover:text-orange-500">About Us</a></li>
              <li><a href="/contact" className="hover:text-orange-500">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-500">Terms of Service</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm">
              Hovie is your go-to platform for discovering, rating, and sharing your love for movies. Stay up-to-date with the latest releases and popular movies from around the world.
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500">
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter to get the latest updates and movie recommendations directly to your inbox.</p>
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                ref={emailRef} // Attach ref to the input field
                className="p-2 w-2/3 rounded-md text-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
            {message && <p className="mt-4 text-sm">{message}</p>}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2024 Hovie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
