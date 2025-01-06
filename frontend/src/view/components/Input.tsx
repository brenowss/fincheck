import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            "peer h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-gray-800 outline-none transition-all placeholder-shown:pt-0 hover:border-gray-500 focus:border-gray-800",
            error && "!border-red-900",
            className,
          )}
          placeholder={" "}
          ref={ref}
          name={name}
          {...props}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{error.message}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
