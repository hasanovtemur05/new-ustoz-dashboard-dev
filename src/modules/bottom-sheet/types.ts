

export interface BottomSheetCreateType {
  id?: string;
  photo: string;
  promocodeId: string;
  isActive: boolean
}

export interface BottomSheetEditBody {
  id: string;
  payload: BottomSheetCreateType;
}

// export interface BottomSheetListResponse {
//   data: BottomSheetCreateType[];
//   meta: { pagination: { count: number; pageCount: number; pageNumber: number; pageSize: number } };
// }




