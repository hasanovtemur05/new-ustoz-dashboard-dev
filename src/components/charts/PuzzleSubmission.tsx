import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { DailyData } from 'modules/statistics/types';
import { useDalyDonation } from 'modules/statistics/hooks/useDailyPuzzleSubmission';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { DateRangePicker } from 'components/DataRangePicker';
import Chart from './Chart';
import { getDefaultDateRange } from 'utils/defaultDateRange';

export default function PuzzleSubmissionChart() {
  const [date, setDate] = useState<DateRange | undefined>(getDefaultDateRange());
  const validDate = date?.from && date.to ? date : getDefaultDateRange();
  const { data: puzzleSubmission } = useDalyDonation(validDate);

  const options = useMemo(() => {
    return {
      series: [
        {
          name: 'Bajarilgan boshqotirmalar',
          data: puzzleSubmission?.map((item: DailyData) => item.count) ?? [],
        },
      ],
      colors: ['#FE574F'],
      chart: {
        height: 400,
        type: 'area',
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 6,
      },
      grid: {
        borderColor: '#EFEFEF',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: puzzleSubmission?.map((item: DailyData) => item.date) ?? [],
        position: 'bottom',
        axisTicks: {
          show: true,
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
  }, [puzzleSubmission, date]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Donation</CardTitle>

          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <Chart options={options} />
      </CardContent>
    </Card>
  );
}
