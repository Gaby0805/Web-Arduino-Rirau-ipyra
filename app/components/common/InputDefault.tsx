import { InputHTMLAttributes } from "react";

interface DefaultTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
  placeholder: string;
  className?: string;
}

export default function DefaultTextInput({
  label,
  placeholder,
  className = "",
  ...rest
}: DefaultTextInputProps)
{

  return (
    <>
      <input
      id="input_id"
        type="text"
        placeholder={placeholder}
        className={` rounded-[15px] px-3 py-2 bg-defaultGray w-sm h-16 mb-10  text-white  outline-none focus:border focus:border-defaultBlue
            focus:transform-border  focus:transition-normal focus:transition-all
          ${className}`}
        {...rest}
      />

  </>
  )
}