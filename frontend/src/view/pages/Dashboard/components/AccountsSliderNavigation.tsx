import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountsSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div className="flex items-center">
      <button
        className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={swiper.isBeginning}
      >
        <ChevronLeftIcon className="size-6 text-white" />
      </button>

      <button
        className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={swiper.isEnd}
      >
        <ChevronRightIcon className="size-6 text-white" />
      </button>
    </div>
  );
}
