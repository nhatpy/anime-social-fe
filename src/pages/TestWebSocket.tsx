import { useApi } from "../hooks";
// import { useWebSocket } from "../hooks";

import { IGetMangaPaginationRequest } from "../interfaces";
import {
  //   MangaStatus,
  //   sortByOptions,
  //   SortOptions,
  statusOptions,
} from "../utils/constants";

export const TestWebSocket = () => {
  // const messageUser1 = useWebSocket({
  //   userId: "4a023136-c00d-4131-919c-e3155d7f5444",
  // });

  // const messageUser2 = useWebSocket({
  //   userId: "37dba83c-dd99-442c-8ef7-f0e61fb8e1a1",
  // });

  const { callApi } = useApi<void>();
  const handleGetPaginationManga = async (
    params: IGetMangaPaginationRequest
  ) => {
    await callApi(async () => {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (typeof value !== "number" && !value) return acc;
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      console.log(queryString);
    });
  };
  // const variable = "NAME";
  // console.log(SortOptions.NAME);
  // console.log(sortByOptions[variable]);
  // console.log(typeof sortByOptions[variable]);
  console.log(statusOptions["FALSE"]?.toString());
  // const variable = "false";
  // console.log(Boolean(variable));
  return (
    <div>
      {/* <p>Notifications for dolongnhat0301@gmail.com:</p>
      {messageUser1 && <p>{messageUser1}</p>}
      <br />
      <br />
      <p>Notifications for dolongnhat0302@gmail.com:</p>
      {messageUser2 && <p>{messageUser2}</p>} */}
      <button
        onClick={() =>
          handleGetPaginationManga({
            type: 0,
            page: 1,
            size: 0,
            searchQuery: "đô thị",
            categorySlug: "",
            status: null,
          })
        }
      >
        test
      </button>
    </div>
  );
};
