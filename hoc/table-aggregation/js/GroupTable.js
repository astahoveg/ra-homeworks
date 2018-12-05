'use strict';

function groupData(data, type) { //начальные данные уже отсортированы
    let newData = [];
    const year = new Date().getFullYear();

    function fillArray(element) {
        if ((newData.length == 0)||(newData[newData.length - 1][type] != element[type])) {
            newData.push({});
            newData[newData.length - 1][type] = element[type];
            newData[newData.length - 1].amount = element.amount;
        } else {
            newData[newData.length - 1].amount += element.amount;
        }
    }

    data.forEach(element => {
        if ((type == "month") && (element.year == year)) {
            fillArray(element);
        } else if (type == "year") {
            fillArray(element);
        }
    });

    return !(newData.length == 0)? newData : data;
}

function sortData(a, b) { // Отсортировал по убыванию
    return (b.objDate - a.objDate);
}

function groupTable(Component, groupType) {
    return function (props, ...args) {

        if (props.list.length > 0) {
            props.list = props.list.map(item => {
                const newItem = item;
                const arrDate = item.date.split("-");

                newItem.objDate = new Date(arrDate[0],+arrDate[1]-1,arrDate[2]);
                newItem.year = newItem.objDate.getFullYear();
                newItem.month = newItem.objDate.getMonth()+1;

                return newItem;
            }).sort(sortData);

            if (groupType) {
                props.list = groupData(props.list, groupType);
            }
        }
        
        return Component.apply(this, [props, ...args]);
    }
}

const GroupMonthTable = groupTable(MonthTable, "month");
const GroupYearTable = groupTable(YearTable, "year");
const GroupSortTable = groupTable(SortTable);