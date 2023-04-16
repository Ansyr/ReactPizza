import React from "react";
import { useSelector } from "react-redux";

import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import { SortPopup } from "../components/SortPopup";
import "../scss/app.scss";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { Pagination } from "../components/pagination/Pagination";
import { fetchPizzas, initPiiza } from "../redux/pizza/asyncActions";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selector";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selector";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const [searchParams] = useSearchParams();
  const onChagePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    dispatch(initPiiza(searchParams));
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .filter((obj: any) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className={"content__error-info"}>
          <h2>Произошла ошибка😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        onChangePage={(page: number) => onChagePage(page)}
      />
    </div>
  );
};
