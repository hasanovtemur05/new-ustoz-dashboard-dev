import { BadgeCheck, Crown, Puzzle, Users, Video, View } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';
import { useMonthlyOverview } from 'modules/statistics/hooks/useMonthlyOverview';
import DauMauStatisticsTable from 'components/DauMauStatistics';

const monthNames = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

export default function MonthlyOverview() {
  const { data: overview, isLoading } = useMonthlyOverview();

  const currentMonth = new Date().getMonth();
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  return (
    <>
      <h2 className="font-semibold text-center">{monthNames[prevMonth]} oyi uchun oylik malumotlar</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Birinchi qator - 4 ta card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Users className="size-5" />
            <CardTitle className="text-sm font-medium">Foydalanuvchilar </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.users?.monthly}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Video className="size-5" />
            <CardTitle className="text-sm font-medium">Video darslar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.lessons?.monthly}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Puzzle className="size-5" />
            <CardTitle className="text-sm font-medium">Kurslar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.courses?.monthly}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Crown className="size-5" />
            <CardTitle className="text-sm font-medium">Sertifikat olganlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.certificates?.monthly}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <View className="size-5" />
            <CardTitle className="text-sm font-medium">Ko'rishlar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.views?.monthly}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <BadgeCheck className="size-5" />
            <CardTitle className="text-sm font-medium">Testlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.quizes?.monthly}</div>
          </CardContent>
        </Card>

        {/* Uchinchi qator - 2 ta card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Users className="size-5" />
            <CardTitle className="text-sm font-medium">Jins boyicha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl flex gap-1 font-bold">
              Ayol:
              <span> {isLoading ? <Skeleton className="h-8 w-20" /> : overview?.gender?.Ayol?.monthly}</span>
            </div>

            <div className="text-xl flex gap-1 font-bold">
              Erkak:
              <span>{isLoading ? <Skeleton className="h-8 w-20" /> : overview?.gender?.Erkak?.monthly}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <DauMauStatisticsTable />
    </>
  );
}
