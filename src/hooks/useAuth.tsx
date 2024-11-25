import { useState } from 'react';

export function useAuth() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const openSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return {
    showLoginModal,
    showSignupModal,
    openLogin,
    openSignup,
    closeModals,
  };
}