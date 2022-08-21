import React, {useCallback, useMemo, useState} from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import Input from '../../components/input';
import LayoutFlex from '../../components/layout-flex';
import useInit from '../../hooks/use-init';
import {categoriesMap} from '../../utils/categoiresMapToNames';

function CatalogFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  useInit(async () => {
    const response = await fetch('/api/v1/categories');
    const json = await response.json();
    setCategories(json.result.items);
  });

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.get('catalog').setParams({sort}), []),
    // Поиск
    onSearch: useCallback(
      query => store.get('catalog').setParams({query, page: 1}),
      []
    ),
    // Сброс
    onReset: useCallback(() => store.get('catalog').resetParams(), [])
  };

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        {value: 'order', title: 'По порядку'},
        {value: 'title.ru', title: 'По именованию'},
        {value: '-price', title: 'Сначала дорогие'},
        {value: 'edition', title: 'Древние'}
      ],
      []
    ),
    sortCategory: useMemo(() => categoriesMap(categories))
  };

  return (
    <LayoutFlex flex="start">
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sortCategory}
      />
      <Select
        onChange={callbacks.onSort}
        value={select.sort}
        options={options.sort}
      />
      <Input
        onChange={callbacks.onSearch}
        value={select.query}
        placeholder={'Поиск'}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
