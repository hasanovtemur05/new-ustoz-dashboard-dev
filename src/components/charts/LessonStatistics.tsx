import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import Chart from './Chart';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { useLessonStatistics } from 'modules/statistics/hooks/useLessonStatistics';

export interface LessonStat {
  lessonTitle: string;
  lessonOrder?: number;
  stoppedUsers: number;
}

export interface LessonStopStatResDto {
  courseTitle: string;
  stats: LessonStat[];
}

export default function LessonStatistics() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);

  const { data: coursesData } = useLessonStatistics();
  const currentCourse = coursesData?.[selectedCourseIndex] as LessonStopStatResDto;
  const currentLesson = currentCourse?.stats?.[selectedLessonIndex] as LessonStat;

  // Kurs o'zgarganda birinchi darsni tanlash
  useEffect(() => {
    setSelectedLessonIndex(0);
  }, [selectedCourseIndex]);

  // Type o'zgarganda birinchi kurs va darsni tanlash
  useEffect(() => {
    setSelectedCourseIndex(0);
    setSelectedLessonIndex(0);
  }, []);

  // Chart uchun options
  const chartOptions = useMemo(() => {
    if (!currentCourse) return null;

    return {
      series: [
        {
          name: "To'xtagan foydalanuvchilar",
          data: currentCourse?.stats.map((item) => item.stoppedUsers) ?? [],
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
          return value.toLocaleString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: currentCourse.stats?.map((item) => item.lessonOrder) ?? [],
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
            return value.toLocaleString();
          },
        },
      },
      title: {
        text: `${currentCourse.courseTitle} - kursidagi darslar bo'yicha to'xtagan foydalanuvchilar soni`,
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    };
  }, [currentLesson]);

  if (!coursesData || coursesData.length === 0) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Dars statistikalari</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Darslarga yetib kelgan foydalanuvchilar</CardTitle>
          <div className="flex gap-4">
            {/* Auth type uchun select */}

            {/* Kurslar uchun select */}
            <div className="w-64">
              <Select
                value={selectedCourseIndex.toString()}
                onValueChange={(value) => setSelectedCourseIndex(parseInt(value))}
                disabled={!coursesData || coursesData.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kursni tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  {coursesData?.map((course: LessonStopStatResDto, index: number) => (
                    <SelectItem key={course.courseTitle} value={index.toString()}>
                      {course.courseTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0 min-h-[400px]">{chartOptions && <Chart options={chartOptions} />}</CardContent>
    </Card>
  );
}
