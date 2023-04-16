import { RootState } from "../store";

export const selectPizzaData = (state: RootState) => state.pizza;

export const getPizzaInited = (state: RootState) => state.pizza.inited;
