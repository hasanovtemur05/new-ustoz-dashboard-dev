import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { useGamesLists } from 'modules/web-games/hooks/useDataLists'
// import { columns } from 'pages/WebGames/Columns';
import React, { useState } from 'react'
import { createDataColumns } from './Columns';
import { WebGamesResponse } from 'modules/web-games/types';
import { Sheet } from 'components/Sheet';
import CustomForm from './CustomForm';
import { TableActions } from 'components/TableActions';
import { AlertDialog } from 'components/AlertDialog';
import { useDeleteGames } from 'modules/web-games/hooks/useDeleteGames';

const WebGamesPage = () => {
  const [data, setData] = useState<WebGamesResponse>()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { data: gamesData, isLoading } = useGamesLists()
  console.log(gamesData, "games data");

   const { triggerDeleteGames } = useDeleteGames(data?.id || '');


  const getRowData = (info: any) => {
      setData(info);
    };

  const columns = createDataColumns({
      getRowData,
      setDialogOpen,
      setSheetOpen,
    })
  
  return (
   <div>
    <TableActions
            sheetTriggerTitle="O'yin qo'shish"
            sheetTitle="Yangi O'yin qo'shish"
            TableForm={CustomForm}
          />

    {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={gamesData || []} />
        </>
      )}

      <Sheet sheetTitle="Productni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm games={data} setSheetOpen={setSheetOpen} />
      </Sheet>

       <AlertDialog
              alertTitle="Ishonchingiz komilmi?"
              alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
              alertCancel="Bekor qilish"
              alertActionTitle="Davom etish"
              alertActionFunction={triggerDeleteGames}
              isOpen={isDialogOpen}
              setIsOpen={setDialogOpen}
            />

   </div>
  )
}

export default WebGamesPage