import { ButtonHTMLAttributes } from "react";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    Name: string;
    className?: string;
}

export default function DefaultButton ({
  Name,
    className = "",
  ...rest
}: DefaultButtonProps)
{

  return (
    <>
        <button 
            className={`bg-defaultBlue text-white px-4 py-2 w-sm h-16 text-[24px] rounded-lg hover:bg-blue-950 transition-all cursor-pointer ${className}`}
            {...rest}
            
        >
            {Name}
        </button>

  </>
  )
}