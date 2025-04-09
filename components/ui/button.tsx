interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    children: React.ReactNode;  // Ensure 'children' is typed correctly
  }
  
  export const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    variant = "primary",
    children,  // 'children' will be rendered inside the button
  }) => {
    const classNames = `px-4 py-2 rounded-lg ${
      variant === "secondary" ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
    }`;
  
    return (
      <button onClick={onClick} disabled={disabled} className={classNames}>
        {children}  {/* Render the content passed as children */}
      </button>
    );
  };
  