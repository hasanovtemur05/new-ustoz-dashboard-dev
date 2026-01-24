import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { AuthType, DailyData } from 'modules/statistics/types';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { DateRangePicker } from 'components/DataRangePicker';
import Chart from './Chart';
import { getDefaultDateRange } from 'utils/defaultDateRange';
import { useUsersByAuthMethod } from 'modules/statistics/hooks/useUsersByAuthMethod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { useLessonStatistics } from 'modules/statistics/hooks/useLessonStatistics';
import { LessonStat, LessonStopStatResDto } from './LessonStatistics';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';

const methods = [
  { label: 'Google', id: AuthType.GOOGLE },
  { label: 'Apple', id: AuthType.APPLE },
  { label: 'Email', id: AuthType.EMAIL },
];

export default function StatisticHalfCompliteCourse() {
  const [type, setType] = useState(AuthType.GOOGLE);
  
  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();
  
  const { data: newUsers } = useUsersByAuthMethod(type, validDate);
  console.log('newUsers by auth method', newUsers);

  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const { data: coursesList } = useCoursesList();

  console.log('coursesData', coursesList);

  // Kurs o'zgarganda birinchi darsni tanlash
  useEffect(() => {
    setSelectedLessonIndex(0);
  }, [selectedCourseIndex]);

  // Type o'zgarganda birinchi kurs va darsni tanlash
  useEffect(() => {
    setSelectedCourseIndex(0);
    setSelectedLessonIndex(0);
  }, []);

  const options = useMemo(() => {
    return {
      series: [
        {
          name: 'Yangi foydalanuvchilar',
          data: newUsers?.map((item: DailyData) => item.count) ?? [],
        },
      ],
      chart: {
        height: 400,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (value: number) {
          return value;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: newUsers?.map((item: DailyData) => item.date) ?? [],
        position: 'bottom',
        axisTicks: {
          show: true,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
      },
      yaxis: {
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
          formatter: function (value: number) {
            return value;
          },
        },
      },
    };
  }, [newUsers]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Foydalanuvchilar ro'yxatdan o'tgan foydalanuvchilar</CardTitle>
          <DateRangePicker date={date} setDate={setDate} />
          <div className="w-48">
            <Select value={type} onValueChange={(value) => setType(value as AuthType)}>
              <SelectTrigger>
                <SelectValue placeholder="Oyni tanlang..." />
              </SelectTrigger>
              <SelectContent>
                {methods.map((month) => (
                  <SelectItem key={month.id} value={month.id}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-64">
            <Select
              value={selectedCourseIndex.toString()}
              onValueChange={(value) => setSelectedCourseIndex(parseInt(value))}
              disabled={!coursesList || coursesList.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kursni tanlang..." />
              </SelectTrigger>
              <SelectContent>
                {coursesList?.map((course, index: number) => (
                  <SelectItem key={course.title} value={index.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0 min-h-[400px]">
        <Chart options={options} />
      </CardContent>
    </Card>
  );
}
