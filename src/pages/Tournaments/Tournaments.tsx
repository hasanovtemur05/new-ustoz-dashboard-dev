import { DataTable } from 'components/DataTable';
import { useTournamentsList } from 'modules/tournaments/hooks/useTournamentsList';
import { columns } from './Columns';
import Loader from 'components/Loader';
import { TableActions } from 'components/TableActions';

const Tournaments = () => {
  const { data: tournamtentsList, isLoading } = useTournamentsList();

  return (
    <div>
      <TableActions />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={tournamtentsList} />
      )}
    </div>
  );
};

export default Tournaments;
