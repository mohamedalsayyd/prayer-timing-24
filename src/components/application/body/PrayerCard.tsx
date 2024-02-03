import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PrayerProps } from "@/types";

export function PrayerCard({ timingsName, timings, img }: PrayerProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <img src={img} alt={`${timingsName} img`} className="rounded" />
        <div className="flex flex-col items-center gap-4 justify-center">
          <CardTitle>{timingsName}</CardTitle>
          <Badge variant={"outline"} className="text-2xl">
            {timings}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
