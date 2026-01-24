import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Loader2, TrendingUp, Download } from 'lucide-react';
import { AxiosError } from 'axios';
import http from 'services/api';

// Types
interface StatisticsData {
  dau: number;
  mau: number;
  dauMauRate: number;
  churnRate: number;
  ltv: number;
  mrr: number;
  arr: number;
  cac: number;
  retentionRate: number;
}

interface ApiResponse {
  data: StatisticsData;
  message?: string;
  success?: boolean;
}

interface Month {
  value: string;
  label: string;
}

interface StatisticItem {
  title: string;
  value: number | string;
}

// Constants
const months: Month[] = [
  { value: '1', label: 'Yanvar' },
  { value: '2', label: 'Fevral' },
  { value: '3', label: 'Mart' },
  { value: '4', label: 'Aprel' },
  { value: '5', label: 'May' },
  { value: '6', label: 'Iyun' },
  { value: '7', label: 'Iyul' },
  { value: '8', label: 'Avgust' },
  { value: '9', label: 'Sentabr' },
  { value: '10', label: 'Oktabr' },
  { value: '11', label: 'Noyabr' },
  { value: '12', label: 'Dekabr' },
];

const DauMauStatisticsTable: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [data, setData] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Set current month as default
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setSelectedMonth(currentMonth.toString());
  }, []);

  const fetchData = async (): Promise<void> => {
    if (!selectedMonth || !amount) {
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await http<ApiResponse>(`https://api.ustozaibot.uz/api/v1/statistics/dau/mau/${selectedMonth}/${amount}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setData(response.data.data);
    } catch (error: unknown) {
      console.error('API Error:', error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError("Ma'lumot topilmadi. Iltimos, parametrlarni tekshiring.");
        } else if (error.response?.status === 403) {
          setError("Ruxsat yo'q. Iltimos, tizimga kiring.");
        } else if (error.response?.status) {
          setError(`Server xatoligi (${error.response.status}). Qayta urinib ko\'ring.`);
        } else if (error.request) {
          setError("Server bilan bog'lanishda muammo. Internet ulanishingizni tekshiring.");
        } else {
          setError("So'rov yuborishda xatolik yuz berdi.");
        }
      } else {
        setError('Kutilmagan xatolik yuz berdi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const downloadExcel = async (): Promise<void> => {
    if (!selectedMonth || !amount) {
      setError('Excel yuklab olish uchun oy va amount parametrlarini kiriting!');
      return;
    }

    setIsDownloading(true);
    setError('');

    try {
      const response = await http(`https://api.ustozaibot.uz/api/v1/statistics/dau/mau/file/${selectedMonth}/${amount}`, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Create blob and download file
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      console.log(url, 'url');
      a.download = `dau-mau-statistika-${selectedMonth}-oy.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: unknown) {
      console.error('Download Error:', error);

      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError('Excel fayli topilmadi. Iltimos, parametrlarni tekshiring.');
        } else if (error.response?.status === 403) {
          setError("Yuklab olish uchun ruxsat yo'q.");
        } else if (error.response?.status) {
          setError(`Excel yuklab olishda xatolik (${error.response.status}).`);
        } else if (error.request) {
          setError("Server bilan bog'lanishda muammo. Internet ulanishingizni tekshiring.");
        } else {
          setError("So'rov yuborishda xatolik yuz berdi.");
        }
      } else {
        setError('Kutilmagan xatolik yuz berdi.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const statisticsData: StatisticItem[] = [
    { title: 'DAU (Kunlik Faol Foydalanuvchilar)', value: data?.dau || 0 },
    { title: 'MAU (Oylik Faol Foydalanuvchilar)', value: data?.mau || 0 },
    { title: 'DAU/MAU Nisbati', value: (data?.dauMauRate || 0) + ' %' },
    { title: 'Churn Rate (Ketish darajasi)', value: (data?.churnRate || 0) + ' %' },
    { title: 'LTV (Mijoz hayot qiymati)', value: (data?.ltv || 0) + ' UZS' },
    { title: 'MRR (Oylik takroriy daromad)', value: (data?.mrr || 0) + ' UZS' },
    { title: 'ARR (Yillik takroriy daromad)', value: (data?.arr || 0) + ' UZS' },
    { title: 'CAC (Mijoz jalb qilish xarajati)', value: (data?.cac || 0) + ' UZS' },
    { title: 'Retention Rate (Ushlab turish darajasi)', value: (data?.retentionRate || 0) + ' %' },
  ];

  const handleMonthChange = (value: string): void => {
    setSelectedMonth(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const getSelectedMonthLabel = (): string => {
    return months.find((m) => m.value === selectedMonth)?.label || '';
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-lg">DAU/MAU Statistikasi</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Form section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Oy</label>
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger>
                <SelectValue placeholder="Oyni tanlang..." />
              </SelectTrigger>
              <SelectContent>
                {months.map((month: Month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Oylik xarajat</label>
            <Input type="number" placeholder="Oylik xarajat kiriting..." value={amount} onChange={handleAmountChange} min="1" />
          </div>

          <div className="flex items-end">
            <Button onClick={fetchData} disabled={!selectedMonth || !amount || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Ma'lumot olish
                </>
              )}
            </Button>
          </div>

          <div className="flex items-end">
            <Button onClick={downloadExcel} disabled={!selectedMonth || !amount || isDownloading} variant="outline" className="w-full">
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Yuklab olinmoqda...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Excel yuklab olish
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Table */}
        {data && (
          <div className="bg-white shadow-sm rounded-lg border overflow-hidden border-gray-200">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Statistika natijalari</h3>
              <p className="text-sm text-gray-600 mt-1">
                {getSelectedMonthLabel()} oyi uchun (Amount: {amount})
              </p>
            </div>

            {/* Table Content */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrika</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymat</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statisticsData.map((item: StatisticItem, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono bg-gray-100 px-3 py-1 rounded-md inline-block">{item.value}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No data message */}
        {!data && !isLoading && !error && (
          <div className="text-center py-12">
            <BarChart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Hech qanday ma'lumot yo'q</h3>
            <p className="mt-1 text-sm text-gray-500">
              Ma'lumot olish uchun oy va amount parametrlarini kiriting va "Ma'lumot olish" tugmasini bosing.
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-2 text-sm text-gray-600">Ma'lumotlar yuklanmoqda...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DauMauStatisticsTable;
