const CartIcon = () => {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M7.5 7.5H21L19 15H9L7.5 7.5Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M9 15H19L18.5 18H9.5L9 15Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M3.5 3H6L7.5 7.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="11" 
        cy="21" 
        r="1" 
        fill="currentColor"
      />
      <circle 
        cx="17" 
        cy="21" 
        r="1" 
        fill="currentColor" 
      />
    </svg>
  );
};

export default CartIcon;