import { useState, useEffect } from "react";
import { MenuModalFallback } from "./MenuModalFallback";
import { FullMenu } from "../types";

interface MenuModalProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuModal(props: MenuModalProps) {
  const { open, onOpenChange, id } = props;
  const [data, setData] = useState<FullMenu | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const baseUrl = "http://localhost:3001/restaurants/227018";

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/menus/${id}?type=full`)
      .then((res) => res.json())
      .then((data): void => {
        setData(data);
        setIsLoading(false);
      });
  }, [open]);

  if (!open) return null;
  return (
    <div>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black opacity-40"
        onClick={() => {
          onOpenChange(false);
        }}
      />
      <div className="opacity-100 w-[1024px] max-lg:w-96 max-md:w-80 max-lg:left-[calc(50%-192px)] max-md:left-[calc(50%-160px)] min-h-96 max-h-[768px] max-md:max-h-[480px] fixed z-10 bg-white max-md:top-[calc(50%-240px)] top-[calc(50%-384px)] left-[calc(50%-512px)] cursor-auto rounded-md transition-all overflow-y-scroll">
        {isLoading ? (
          <MenuModalFallback />
        ) : (
          <>
            <img
              src={data?.largeImage}
              className="rounded-t-md max-md:h-48 h-60 w-full object-cover"
            />
            <div className="p-4">
              <div className="text-2xl font-bold">{data?.name}</div>
              <div className="text-lg font-semibold flex flex-row">
                {data?.discountedPercent ?? 0 > 0 ? (
                  <div className=" flex flex-row gap-2">
                    <div className="line-through">{data?.fullPrice} บาท</div>
                    <div>
                      {data?.fullPrice ??
                        0 * (1 - (data?.discountedPercent ?? 0) / 100)}{" "}
                      บาท
                    </div>
                  </div>
                ) : (
                  <div>{data?.fullPrice} บาท </div>
                )}
              </div>
              <div className="text-gray-500">ขายไปแล้ว: {data?.sold} ชิ้น</div>
              <div className="text-gray-500">
                คงเหลือ: {data?.totalInStock} ชิ้น
              </div>
              <div className="flex flex-col mt-4">
                {data?.options.map((option) => {
                  return (
                    <div
                      className="flex flex-col gap-2 mb-4"
                      key={option.label}
                    >
                      <div className="text-lg font-semibold">
                        {option.label}
                      </div>
                      {option.choices.length === 1 ? (
                        <div className="flex flex-row items-center gap-2">
                          <input
                            type="checkbox"
                            name={`option-${option.label}`}
                            className="w-4 h-4"
                          />
                          <div className="text-lg">
                            {option.choices[0].label}
                          </div>
                        </div>
                      ) : (
                        option.choices.map((item) => (
                          <div
                            className="flex flex-row items-center gap-2"
                            key={item.label}
                          >
                            <input
                              type="radio"
                              name={`option-${option.label}`}
                              className="w-4 h-4"
                            />
                            <div className="text-lg">{item.label}</div>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className="bg-black text-white w-full rounded-md py-2 cursor-pointer disabled:cursor-not-allowed"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                ปิด
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
