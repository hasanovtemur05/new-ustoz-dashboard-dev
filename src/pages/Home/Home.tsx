import Overview from './Overview';
import NewUsersChart from 'components/charts/NewUsers';
import DonationStatistics from 'components/charts/DonationStatistics';
import MonthlyOverview from './MonthlyOverview';
import NewUsersByAuthMethod from 'components/charts/NewUsersByAuthMethod';
import SertificateStatistics from 'components/charts/CertificateStatistics';
import LessonStatistics from 'components/charts/LessonStatistics';
import CoinStatistics from 'components/charts/CoinStatistics';
import StatisticHalfCompliteCourse from 'components/charts/StatisticHalfCompliteCourse';

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-center">Umumiy malumotlar</h2>
      <Overview />
      <MonthlyOverview />
      <LessonStatistics />
      <CoinStatistics />
      <NewUsersChart />
      <DonationStatistics />
      <SertificateStatistics />
      <NewUsersByAuthMethod />
      {/* <StatisticHalfCompliteCourse /> */}
    </div>
  );
};

export default Home;
