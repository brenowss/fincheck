import { Transition } from "@headlessui/react";
import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

interface SplashProps {
  isLoading: boolean;
}

export function Splash({ isLoading }: SplashProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed left-0 top-0 grid size-full place-items-center bg-teal-900">
        <div className="flex flex-col items-center justify-center">
          <Logo className="h-10 text-white" />
          <Spinner className="fill-white text-transparent" />
        </div>
      </div>
    </Transition>
  );
}
