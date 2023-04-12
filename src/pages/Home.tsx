import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import "../scss/app.scss";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Categories from "../components/Categories";
import { Pagination } from "../components/pagination/Pagination";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChagePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      //   @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const category = categoryId > 0 ? `&category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  // Если был первый рендер, то проверяем URL параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  // Если был первый рендер, то запрашиваем все пииццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .filter((obj: any) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj: any) => (
      <Link key={obj.id} to={`pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id: number) => onChangeCategory(id)}
        />
        <Sort />
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
