import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cities } from "@/types";

export function CitySelect({ onSelectChange }: { onSelectChange: any }) {
  let cities: Cities = {
    alex: "الاسكندرية",
    cairo: "القاهرة",
    mansora: "المنصورة",
    giza: "الجيزة",
    siwa: "سيوة",
  };
  const handleSelectChange = (selectedValue: string) => {
    const cityName = cities[selectedValue];
    onSelectChange(cityName);
    localStorage.setItem("city", cityName);
  };
  return (
    <Select dir="rtl" onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[380px]">
        <SelectValue placeholder="قم باختيار المدينة" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>جميع المدن</SelectLabel>
          <SelectItem value="alex">الاسكندرية</SelectItem>
          <SelectItem value="cairo">القاهرة</SelectItem>
          <SelectItem value="mansora">المنصورة</SelectItem>
          <SelectItem value="giza">الجيزة</SelectItem>
          <SelectItem value="siwa">سيوة</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
