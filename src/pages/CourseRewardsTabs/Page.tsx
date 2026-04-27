import { useState } from 'react';
import LessonRewardPage from 'pages/CourseReward/Page';
import AddRewardToLessons from 'pages/AddRewardToLessons/Page';
import LessonRewardBoxPage from 'pages/LessonRewardBox/Page';
import { cn } from 'utils/styleUtils';
import { Gift, BookOpen, Package } from 'lucide-react';
import { useCoursesList } from 'modules/courses/hooks/useCoursesList';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useLessonRewardList } from 'modules/course-reward-product/hooks/useList';
import SearchSelectWithoutForm from 'components/fields/SearchSelectWithoutForm';

const CourseRewardsTabsPage = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'direct' | 'boxes'>('templates');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCourseId = searchParams.get('courseId') || '';

  const { data: coursesList, isLoading: loadingCourses } = useCoursesList({ isActive: true });

  // Fetch templates to see which courses have rewards
  const { data: templates, isLoading: loadingTemplates } = useLessonRewardList({ pageSize: 1000 } as any);

  // Filter courses that have rewards (quick access)
  const quickAccessCourses = useMemo(() => {
    if (!coursesList) return [];
    return coursesList.filter(course => course.itHasGift);
  }, [coursesList]);

  const coursesOptions = useMemo(() => {
    const base = (coursesList || []).map(c => ({ name: c.title, id: c.id }));
    return [{ name: 'Barchasi', id: '' }, ...base];
  }, [coursesList]);

  const isLoading = loadingCourses || loadingTemplates;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dars Sovg'alari (Rewards)</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Bu yerdan darslarga sovg'alar va qutilarni biriktirishingiz hamda sovg'a shablonlarini boshqarishingiz mumkin.
          </p>
        </div>

        {activeTab !== 'templates' && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-1 duration-300">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Barcha kurslar:</span>
            <SearchSelectWithoutForm
              data={coursesOptions}
              value={selectedCourseId}
              placeholder="Barcha kurslar"
              onChange={(val) => setSearchParams({ courseId: val })}
              className="w-full md:w-[250px]"
            />
          </div>
        )}
      </div>

      {activeTab !== 'templates' && quickAccessCourses.length > 0 && (
        <div className="flex items-center w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          <div className="flex gap-2 min-w-max px-1">
            <button
              onClick={() => setSearchParams({ courseId: '' })}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border shadow-sm",
                selectedCourseId === ''
                  ? "bg-blue-600 text-white border-blue-600 shadow-blue-200 dark:shadow-none"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
              )}
            >
              Barchasi
            </button>
            {quickAccessCourses.map((course) => {
              const isActive = selectedCourseId === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => setSearchParams({ courseId: course.id })}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border shadow-sm",
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-blue-200 dark:shadow-none"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
                  )}
                >
                  {course.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('templates')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 outline-none",
            activeTab === 'templates'
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
          )}
        >
          <Gift className="w-4 h-4" />
          Sovg'alar Shabloni
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 outline-none",
            activeTab === 'direct'
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
          )}
        >
          <BookOpen className="w-4 h-4" />
          Dars Sovg'alari
        </button>
        <button
          onClick={() => setActiveTab('boxes')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 outline-none",
            activeTab === 'boxes'
              ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
              : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/50"
          )}
        >
          <Package className="w-4 h-4" />
          Darslar Qutisi (Box)
        </button>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-lg">
        {activeTab === 'templates' && <LessonRewardPage />}
        {activeTab === 'direct' && <AddRewardToLessons />}
        {activeTab === 'boxes' && <LessonRewardBoxPage />}
      </div>
    </div>
  );
};

export default CourseRewardsTabsPage;
