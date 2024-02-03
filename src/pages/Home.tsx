import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { CitySelect } from "@/components/application/body/CitySelect";
import Heading from "@/components/application/body/Heading";
import { PrayerCard } from "@/components/application/body/PrayerCard";
import Header from "@/components/application/header/Header";
import { AsrImg, DhhrImg, FajrImg, IshaImg, MagrabImg } from "@/constants/imgs";
import { useGetTimingsByCityQuery } from "@/rtk/slices/api-slice";
import { CityMap, Timings } from "@/types";

const Home = () => {
  const cityMap: CityMap = {
    Alexandria: "الاسكندرية",
    Cairo: "القاهرة",
    Siwa: "سيوة",
    Mansora: "المنصورة",
    Giza: "الجيزة",
  };
  localStorage.getItem("city")
    ? ""
    : localStorage.setItem("city", "الاسكندرية");
  const [city, setCity] = useState("");
  const [cityInEn, setCityInEn] = useState("");
  const { data, error, isLoading } = useGetTimingsByCityQuery(cityInEn);

  const handleSelectChange = (value: string) => {
    setCity(value);
    setCityInEn(value);
  };

  useEffect(() => {
    if (data?.data?.timings) {
      const updatedTimings = { ...data.data.timings };
      for (const key in updatedTimings) {
        const firstPart = Number(updatedTimings[key].split(":")[0]);

        const formattedFirstPart =
          firstPart < 10 ? `0${firstPart}` : `${firstPart}`;

        if (firstPart > 12) {
          updatedTimings[key] = `${formattedFirstPart}:${
            updatedTimings[key].split(":")[1]
          }`;
        } else {
          updatedTimings[key] = `${formattedFirstPart}:${
            updatedTimings[key].split(":")[1]
          }`;
        }
      }
      setTimings(updatedTimings);
    }

    const value = localStorage.getItem("city");
    for (const key in cityMap) {
      if (cityMap[key] === value) {
        setCityInEn(key);
        break;
      }
    }
  }, [data, cityMap, setCityInEn]);

  const [timings, setTimings] = useState<Timings>({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Maghrib: "18:03",
    Isha: "19:33",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center m-auto h-screen ">
        <TailSpin
          visible={true}
          height={80}
          width={80}
          color="#ea580c"
          ariaLabel="tail-spin-loading"
          radius={1}
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <Header />
      <div className="my-10">
        <Heading city={city} timings={timings} />
      </div>
      <div className="container flex flex-col md:flex-row items-center gap-6 m-auto my-28 ">
        <PrayerCard
          timingsName={"صلاة الفجر"}
          timings={timings.Fajr}
          img={FajrImg}
        />
        <PrayerCard
          timingsName={"صلاة الظهر"}
          timings={timings.Dhuhr}
          img={DhhrImg}
        />
        <PrayerCard
          timingsName={"صلاة العصر"}
          timings={timings.Asr}
          img={AsrImg}
        />
        <PrayerCard
          timingsName={"صلاة المغرب"}
          timings={timings.Maghrib}
          img={MagrabImg}
        />
        <PrayerCard
          timingsName={"صلاة العشاء"}
          timings={timings.Isha}
          img={IshaImg}
        />
      </div>

      <div className="container flex items-center justify-center mb-44">
        <CitySelect onSelectChange={handleSelectChange} />
      </div>
    </div>
  );
};

export default Home;
