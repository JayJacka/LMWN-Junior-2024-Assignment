import { useMemo } from "react";

interface MenuCardProps {
  title: string;
  imgURL: string;
  price: number;
  discountedPercent: number;
  onViewDetail: () => void;
}

export function MenuCard(props: MenuCardProps) {
  const { title, imgURL, price, discountedPercent, onViewDetail } = props;

  const discountedPrice = useMemo(() => {
    return price * (1 - discountedPercent / 100);
  }, [price, discountedPercent]);

  return (
    <div
      className="w-full flex flex-row items-center gap-4 max-md:gap-2 h-32 max-md:h-24 p-4 max-md:p-2 rounded-md bg-white hover:bg-gray-100 cursor-pointer transition-all"
      onClick={onViewDetail}
    >
      <img
        src={imgURL}
        className="rounded-md w-24 h-24 max-md:h-20 max-md:w-20 object-cover"
      />
      <div className="flex flex-col">
        <div className="font-semibold text-xl">{title}</div>
        {discountedPercent > 0 ? (
          <div className="text-gray-500 text-lg flex flex-row gap-2">
            <div className="line-through">{price} บาท</div>
            <div>{discountedPrice} บาท</div>
          </div>
        ) : (
          <div className="text-gray-500 text-lg">{price} บาท </div>
        )}
      </div>
    </div>
  );
}
