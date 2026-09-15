"use client";

import { ValueComparisonResult } from "../types";

type PriceCheckProps = {
  result: ValueComparisonResult;
};

export default function ResultCard({ result }: PriceCheckProps) {
  const productOneUnitPrice = result.productOnePrice / result.productOneQty;

  const productTwoUnitPrice = result.productTwoPrice / result.productTwoQty;

  return (
    <div className="relative w-[320px] bg-[#f7f3e8] px-6.5 pb-5.5 pt-7  text-[#262220] shadow-[0_18px_34px_rgba(38,34,32,0.22)] bg-[repeating-linear-gradient(transparent_0_27px,rgba(38,34,32,0.035)_27px_28px)] font-mono">
      {/* Torn top edge */}
      <div className="absolute -top-[9px] right-0 left-0 h-[10px] bg-[linear-gradient(135deg,#f7f3e8_50%,transparent_50%),linear-gradient(45deg,#f7f3e8_50%,transparent_50%)] bg-[length:14px_14px] bg-repeat-x" />

      {/* Torn bottom edge */}
      <div className="absolute -bottom-[9px] right-0 left-0 h-[10px] rotate-180 bg-[linear-gradient(135deg,#f7f3e8_50%,transparent_50%),linear-gradient(45deg,#f7f3e8_50%,transparent_50%)] bg-[length:14px_14px] bg-repeat-x" />

      <p className="mb-[2px] text-center text-[13px] font-bold tracking-[2px]">PRICE CHECK</p>
      <p className="mb-[18px] text-center text-[10.5px] text-[#6b625a]">pack size comparison</p>

      {/* Product 1 */}
      <div className="mb-[2px]">
        <div className="flex justify-between gap-3 text-[13px] font-bold">
          <span>Small pack · {result.productOneQty} units</span>
          <span>₹{result.productOnePrice}</span>
        </div>
        <div className="mt-[3px] flex justify-between text-[11px] text-[#6b625a]">
          <span>per unit</span>
          <span className="font-bold text-[#262220]">₹{productOneUnitPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-[14px] border-0 border-t-[1.5px] border-dashed border-[#cdc3ad]" />

      {/* Product 2 */}
      <div className="mb-[2px]">
        <div className="flex justify-between gap-3 text-[13px] font-bold">
          <span>Large pack · {result.productTwoQty} units</span>
          <span>₹{result.productTwoPrice}</span>
        </div>
        <div className="mt-[3px] flex justify-between text-[11px] text-[#6b625a]">
          <span>per unit</span>
          <span className="font-bold text-[#262220]">₹{productTwoUnitPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings */}
      <div className="mt-4 border-[1.5px] border-dashed border-[#3f5d3a] bg-[#e4ead9] px-[14px] py-3 text-center">
        <div className="text-[20px] font-bold tracking-[0.5px] text-[#3f5d3a]">
          SAVE ₹{result.priceDiff}
        </div>
        <div className="mt-[3px] text-[10.5px] text-[#3f5d3a] opacity-85">
          {result.cheapPercentage}% cheaper · large pack
        </div>
      </div>

      {/* Barcode */}
      <div className="mt-5 h-[34px] opacity-85 bg-[repeating-linear-gradient(90deg,#262220_0_2px,transparent_2px_4px,#262220_4px_5px,transparent_5px_9px,#262220_9px_12px,transparent_12px_14px)]" />

      <div className="mt-[6px] text-center text-[9.5px] tracking-[3px] text-[#6b625a]">
        GO LARGE
      </div>
    </div>
  );
}
