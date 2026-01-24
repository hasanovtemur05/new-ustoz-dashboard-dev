import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from 'components/DataTableRowActions';
import { CertificateType } from 'modules/certificate/types';
import { Course } from 'modules/courses/types';
import { StoryType } from 'modules/story/types';
import { baseMediaUrl } from 'services/api';

interface IProps {
  getRowData: (notification: StoryType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<StoryType>[] => [
    {
      accessorKey: 'photo',
      header: 'Rasm',
      cell: ({ row }) => {
        return <img src={`${baseMediaUrl}/${row.getValue('photo')}`} alt="img" width={80} height={60} style={{
          objectFit: "cover",
          maxHeight:"60px"
        }} loading="lazy" />;
      },
    },
    {
      accessorKey: 'title',
      header: 'Story title',
    },
    // {
    //   accessorKey: 'video',
    //   header: 'Video',
    //   cell: ({ row }) => {
    //     const course = row.getValue('video')
    //     return <>
    //       <div className='w-24 max-h-16 relative' >

    //         <video
    //           src={`${baseMediaUrl}/${course}`}
    //           controls
    //           className=" w-24 max-h-16"
    //         />


    //       </div>
    //     </>;
    //   },
    // },
    {
      accessorKey: 'video',
      header: 'Video',
      cell: ({ row }) => {
        return <a style={{ color: "blue", cursor: "pointer" }} target="_blank" rel="noreferrer noopener" href={`${baseMediaUrl}/${row.getValue("video")}`}>Videoni ko'rish</a>;
      },
    },
    {
      accessorKey: 'link',
      header: 'Link',
      cell: ({ row }) => {
        return <a style={{ color: "blue", cursor: "pointer" }} target="_blank" rel="noreferrer noopener" href={row.getValue('link')}>Link</a>;
      },
    },

    {
      accessorKey: 'id',
      header: () => <span className="sr-only">Actions</span>,
      size: 50,
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          getRowData={getRowData}
          setDialogOpen={setDialogOpen}
          setSheetOpen={setSheetOpen}
        />
      ),
    },
  ];
