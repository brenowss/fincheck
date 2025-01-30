import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import {
  BankAccountType,
  BankAccountTypeIcon,
} from "../../../../components/icons/BankAccountTypeIcon";

interface AccountCardProps {
  name: string;
  color: string;
  balance: number;
  type: BankAccountType;
}

export function AccountCard({ name, color, balance, type }: AccountCardProps) {
  return (
    <div
      className="flex h-52 flex-col justify-between rounded-2xl border-b-4 border-teal-950 bg-white p-4"
      style={{
        borderColor: color,
      }}
    >
      <div className="">
        <BankAccountTypeIcon type={type} />
        <span className="mt-2 block font-medium -tracking-[0.5px] text-gray-800">
          {name}
        </span>
      </div>

      <div>
        <span className="mt-4 block font-medium -tracking-[0.5px] text-gray-800">
          {formatCurrency(balance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
