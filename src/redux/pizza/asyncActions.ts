import { createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza, SearchPizzaParams } from "./types";
import axios from "axios";
import { addQueryParams } from "../../utils/url";
import { getPizzaInited } from "./selector";
import { setCurrentPage } from "../filter/slice";
import { setInited } from "./slice";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;

    addQueryParams({
      sortBy,
      order,
      category,
      search,
      currentPage,
    });

    const { data } = await axios.get<Pizza[]>(
      `https://640cc3c0a3e07380e8fc878b.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
export const initPiiza = createAsyncThunk<void, URLSearchParams, any>(
  "pizzaState/initPizza",
  async (searchParams, thunkApi: any) => {
    const { getState, dispatch } = thunkApi;
    const inited = getPizzaInited(getState());
    const page = searchParams.get("currentPage");
    if (page) {
      dispatch(setCurrentPage(Number(page)));
    }
    dispatch(setInited(true));
  }
);
