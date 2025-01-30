import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
  return (
    <div className="flex size-full flex-col rounded-2xl bg-teal-900 px-4 py-8 md:p-10">
      <div className="">
        <span className="block -tracking-[0.5px] text-white">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl -tracking-[1px] text-white">
            R$ 1.000,00
          </strong>
          <button className="grid size-10 place-items-center">
            <EyeIcon open={true} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.2}>
            <div
              className="mb-4 flex items-center justify-between"
              slot="container-start"
            >
              <strong className="text-lg -tracking-[1px] text-white">
                Minhas contas
              </strong>

              <AccountsSliderNavigation />
            </div>

            <SwiperSlide>
              <AccountCard
                name="Nubank"
                color="#9c07ff"
                balance={50000.5}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Rico"
                color="#f87b15"
                balance={29530}
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Nubank"
                color="#9c07ff"
                balance={50000.5}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Rico"
                color="#f87b15"
                balance={29530}
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Nubank"
                color="#9c07ff"
                balance={50000.5}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Rico"
                color="#f87b15"
                balance={29530}
                type="INVESTMENT"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Nubank"
                color="#9c07ff"
                balance={50000.5}
                type="CASH"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                name="Rico"
                color="#f87b15"
                balance={29530}
                type="INVESTMENT"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
