import React from "react";
import qs from 'qs';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCategoryId, setCurrentPage, setOrder, setFilters, selectFilter } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue, categoryId, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);


  const onChangePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  };

  const getPizzas = async () => {
    const category = categoryId ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty;
    const order = sort.order ? "asc" : "desc";
    const search = searchValue ? `&title=${searchValue}` : "";

    dispatch(fetchPizzas( {
      category,
      sortBy,
      order,
      search,
      currentPage
    }))
  }

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        order: sort.order ? "asc" : "desc",
        categoryId: categoryId,
        currentPage: currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage])

  // Если был первый рендер, то проверяем URL и созраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, [])

  // Если был первый рендер, то делаем запрос
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);



  const pizzas = items
    // .filter((obj) =>
    //   obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((obj) => (
      // <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock key={obj.id} {...obj} />
      // </Link>
    ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort onChangeOrder={() => dispatch(setOrder())} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Loading error 😕</h2>
          <p>Please try again later</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
