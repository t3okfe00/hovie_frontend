import React from "react";

interface AuthButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
  isLoading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  onClick,
  type = "button",
  children,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
