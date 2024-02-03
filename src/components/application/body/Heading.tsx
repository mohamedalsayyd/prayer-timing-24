import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useEffect, useState } from "react";
import "moment/dist/locale/ar";
import { PrayerArray } from "@/types";
moment.locale("ar");

const Heading = ({ city, timings }: { city: string; timings: any }) => {
  const [today, setToday] = useState("");
  const [nextPrayer, setNextPrayer] = useState(0);
  const [remainingTime, setReminingTime] = useState("");
  const prayerArray: PrayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const getNextPrayer = () => {
    const momentNow = moment();
    let prayerIndex = 2;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayer(prayerIndex);
    // console.log(
    //   momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
    //     momentNow.isBefore(moment(timings["Magrib"], "hh:mm")),
    //   timings
    // );

    const nextPrayerObj = prayerArray[nextPrayer];
    const nextPrayerTime = timings[nextPrayerObj.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm:ss");
    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiffernce;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    setReminingTime(
      `${durationRemainingTime.seconds()} :  ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
  };

  useEffect(() => {
    const updateTimeInterval = setInterval(() => {
      const t = moment();
      setToday(t.format("Do MMMM YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(updateTimeInterval);
  }, []);
  useEffect(() => {
    getNextPrayer();
  }, [timings]);

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4 container justify-around items-center">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl">{today}</h1>
        <Badge className="text-2xl">
          {city === "" ? localStorage.getItem("city") : city}
        </Badge>
      </div>
      <div className="text-2xl flex flex-col items-center gap-4">
        <h1>متبقي حتى صلاة {prayerArray[nextPrayer].displayName}</h1>
        <Badge className="text-2xl" variant={"outline"}>
          {remainingTime}
        </Badge>
      </div>
    </div>
  );
};

export default Heading;
