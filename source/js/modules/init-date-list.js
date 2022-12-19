// 2. Имеется JSON файл numbers.json с массивами данных, где:
//
// "alias" - название месяца,
// "date_from" - дата начала месяца,
// "date_to" - дата конца месяца,
// "number_list" - список номеров для данного месяца,
// "cdate" - дата, соответствующая номеру из number_list,
// "is_visible" - статус месяца.
//
//   Необходимо:
// - создать таблицу с двумя колонками, в одной из которых будут отображаться номера из number_list для выбранного месяца,
// а в соседней колонке для всех значений должна отображаться соответствующая им дата из cdate в формате ДД.ММ.ГГГГ;
// - над таблицей разместить строку поиска, ввод номера в которую отобразит найденный номер в таблице, скрыв все остальные;
// - переключение месяцев выполнить в виде табов, где должны отображаться только месяцы с соответствующим значением в строке is_visible.
// Название месяца должно быть с большой буквы.

import dayjs from 'dayjs';

let currentTabIndex = 0;
let tabs = [];

const initDateList = () => {
  const searchBlock = document.getElementById('search');
  if(!searchBlock) {
    return;
  } else {
    fetch('./data/numbers.json')
      .then((response) => response.json())
      .then((data) => {
        tabs = data.numbers;
        renderTabs(data.numbers);
      });

    searchBlock.oninput = (event) => {
      onSearchChanged(event.target.value);
    };
  }
};

const renderTabs = (tabs) => {
  const containerElement = document.querySelector('.months__list');
  tabs.forEach((tab, index) => {
    if (tab.is_visible) {
      const tabElement = document.createElement('li');
      tabElement.classList.add('months__item');
      const dateList = Object.values(tab.number_list);
      tabElement.innerHTML = `<button class="button button--tab months__tab">${capitalizeFirstLetter(tab.alias)}<span class="months__badge">${dateList.length}</span></button>`;
      tabElement.querySelector('button').onclick = () => {
        onTabClicked(tab, index);
      };
      containerElement.appendChild(tabElement);
      if (index === currentTabIndex) {
        renderDateList(dateList);
        tabElement.classList.add('selected')
      }
    }
  });
};

const invalidateDateList = (numberList, searchRequest) => {
  const array = Object.values(numberList);
  if (searchRequest) {
    const filteredList = array.filter(item => item.number.includes(searchRequest));
    renderDateList(filteredList);
  } else {
    renderDateList(array);
  }
};

const renderDateList = (list) => {
  const containerElement = document.querySelector('.months__table');
  containerElement.innerHTML = '';
  list.forEach((item) => {
    const itemElement = document.createElement('tr');
    const date = dayjs(item.cdate);
    itemElement.innerHTML = `<td>${item.number}</td><td class="td-end">${date.format('DD.MM.YYYY')}</td>`;
    containerElement.appendChild(itemElement);
  });
};

const onSearchChanged = (request) => {
  invalidateDateList(tabs[currentTabIndex].number_list, request);
};

const onTabClicked = (tab, tabIndex) => {
  const tabsElements = document.querySelectorAll('.months__tab');
  tabsElements.forEach(element => {
    element.classList.remove('selected');
  })
  tabsElements[tabIndex].classList.add('selected');
  currentTabIndex = tabIndex;
  invalidateDateList(tab.number_list);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {initDateList};
