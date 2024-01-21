import { useEffect, useState, Suspense } from "react";

import { compareTime } from "./utils/compareTime";
import { MenuModal } from "./components/MenuModal";
import { MenuCard } from "./components/MenuCard";
import { HomePageFallback } from "./components/HomePageFallback";
import type { Restaurant, ShortMenu } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [data, setData] = useState<Restaurant | null>(null);
  const [menuDetails, setMenuDetails] = useState<ShortMenu[] | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const baseUrl = "http://localhost:3001/restaurants/227018";

  useEffect(() => {
    fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then((data): void => {
        setData(data);
        const firstTenMenus = data.menus.slice(0, 10);
        const menuPromises = firstTenMenus.map((menu: string) =>
          fetch(`${baseUrl}/menus/${menu}?type=short`).then((res) =>
            res.json(),
          ),
        );
        Promise.all(menuPromises)
          .then((menuDetails) => {
            setMenuDetails(menuDetails);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching menu details:", error);
          });
      });
  }, []);

  function fetchMoreMenu() {
    setIsFetchingMore(true);
    const lastMenuId =
      menuDetails && menuDetails.length > 0
        ? menuDetails[menuDetails.length - 1].id
        : null;
    const lastMenuIndex = data?.menus.findIndex((menu) => menu === lastMenuId);
    const nextTenMenus = data?.menus.slice(
      (lastMenuIndex ?? 0) + 1,
      (lastMenuIndex ?? 0) + 11,
    );
    const menuPromises = nextTenMenus?.map((menu) =>
      fetch(`${baseUrl}/menus/${menu}?type=short`).then((res) => res.json()),
    );
    Promise.all(menuPromises ?? [])
      .then((newMenuDetails) => {
        setMenuDetails((prevMenuDetails: any) => [
          ...prevMenuDetails,
          ...newMenuDetails,
        ]);
        setIsFetchingMore(false);
      })
      .catch((error) => {
        console.error("Error fetching menu details:", error);
      });
  }

  if (isLoading) {
    return <HomePageFallback />;
  }

  return (
    <div
      className="mx-auto overflow-y-scroll max-lg:bg-contain max-lg:bg-top bg-cover bg bg-fixed bg-[center_bottom_320px] bg-no-repeat w-full font-ibmplex"
      style={{ backgroundImage: `url('${data?.coverImage}')` }}
    >
      <div className="max-lg:mt-[calc(40%)] mt-[400px]">
        <div className="bg-white w-full flex flex-col items-center">
          <div className="max-w-5xl w-full max-md:p-4 p-8 flex flex-col items-center gap-8 max-md:gap-4">
            <div className="flex flex-row items-center">
              <div className="text-5xl max-md:text-2xl font-extrabold tracking-tight text-black">
                {data?.name}
              </div>
              {compareTime(
                data?.activeTimePeriod?.open ?? "",
                data?.activeTimePeriod.close ?? "",
              ) ? (
                <div className="ml-4 px-2 inline-flex text-lg font-semibold rounded-full bg-green-100 text-green-800">
                  เปิด
                </div>
              ) : (
                <div className="ml-4 px-2 inline-flex text-lg font-semibold rounded-full bg-red-100 text-red-800">
                  ปิด
                </div>
              )}
            </div>
            <div>
              เวลาเปิด: {data?.activeTimePeriod.open} -{" "}
              {data?.activeTimePeriod.close}
            </div>
            <div className="flex flex-col gap-2 w-full">
              {menuDetails?.map((menu) => (
                <MenuCard
                  title={menu.name}
                  imgURL={menu.thumbnailImage ?? ""}
                  price={menu.fullPrice}
                  discountedPercent={menu.discountedPercent}
                  key={menu.id}
                  onViewDetail={() => {
                    setId(menu.id);
                    setOpenModal(true);
                  }}
                />
              ))}
            </div>
            {(menuDetails?.length ?? 0) < (data?.menus.length ?? 0) && (
              <button
                className="bg-black text-white w-full rounded-md py-2 cursor-pointer disabled:cursor-not-allowed"
                onClick={fetchMoreMenu}
                disabled={isFetchingMore}
              >
                {isFetchingMore ? "กำลังโหลด..." : "โหลดเพิ่ม"}
              </button>
            )}
          </div>
        </div>
      </div>
      <MenuModal open={openModal} onOpenChange={setOpenModal} id={id} />
    </div>
  );
}

export default App;
