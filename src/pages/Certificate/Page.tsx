"use client"

import { useState } from "react"
import { DataTable } from "components/DataTable"
import { TableActions } from "components/TableActions"
import { Sheet } from "components/Sheet"
import { AlertDialog } from "components/AlertDialog"
import Loader from "components/Loader"

import CustomForm from "./CustomForm"
import { useCertificatesList } from "modules/certificate/hooks/useList"
import { useRecomList } from "modules/certificate/hooks/useList"
import type { CertificateType } from "modules/certificate/types"
import { Pagination } from "components/Pagination"
import RecommendationCertificateForm from "./RecommendationCertificateForm"
import { createDataColumns } from "./Columns"
import { useDeleteRow } from "modules/certificate/hooks/useDelete"

const Certificate = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [data, setData] = useState<CertificateType>()

  const [currentPage, setCurrentPage] = useState(1)
  const { data: notificationsList, isLoading, paginationInfo } = useCertificatesList(currentPage)
  const { data: recomData, isLoading: isRecomLoading, paginationInfo: recomPaginationInfo } = useRecomList(currentPage)
  console.log(recomData, "recom data")

  const rowType = data && "degree" in data ? "certificate" : "recommendation"
  const { triggerDelete } = useDeleteRow(data?.id || "", rowType)

  const getRowData = (info: any) => {
    setData(info)
  }

  const tableData = [...(notificationsList ?? []), ...(recomData ?? [])]
  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  })

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Setifikat qo'shish"
        sheetTriggerTitle2="Havaskor Sertifikat qo'shish"
        sheetTitle="Yangi setifikat qo'shish"
        sheetTitle2="Yangi havaskor sertifikat qo'shish"
        TableForm={CustomForm}
        TableForm2={RecommendationCertificateForm}
        showSecondButton={true}
      />
      {isLoading || isRecomLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns as any} data={tableData} />
          {paginationInfo && (
            <Pagination
              className="justify-end mt-3"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginationInfo={paginationInfo ?? recomPaginationInfo}
            />
          )}
        </>
      )}

      <Sheet sheetTitle="Setifikatni tahrirlash" isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <CustomForm certificate={data} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={() => triggerDelete()}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  )
}

export default Certificate
