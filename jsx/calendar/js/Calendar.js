function getMonthStr(mounth) {
    const monthNames = ["Январь", "Февраль", "Март",
        "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь"];
    return monthNames[mounth];
}

function getDayStr(day) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[day];
}

const CalendarHeader = function (props) {
    const { day, date, month, year } = props;
    return (
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{day}</div>
            <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{date}</div>
                <div className="ui-datepicker-material-month">{month}</div>
                <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
    );
};

const CalendarTitle = function (props) {
    const { month, year } = props;
    return (
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
            </div>
        </div>
    );
}

const CalendarTable = function (props) {
    const { month, year } = props;
    let first_day = new Date(year, month);

    console.log(first_day, month);
    console.log(first_day.getDay());

    if (first_day.getDay() != 1) {
        let day_num;
        if (first_day.getDay() == 0) {
            day_num = 6;
        } else {
            day_num = (first_day.getDay() - 1);
        }
        first_day.setDate(first_day.getDate() - day_num);
    }

    console.log(first_day);

    return (
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col classNameName="ui-datepicker-week-end" />
                <col className="ui-datepicker-week-end" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>6</td>
                    <td>7</td>
                    <td className="ui-datepicker-today">8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                </tr>
            </tbody>
        </table>
    );
}

const Calendar = function (props) {
    const day = props.date.getDay();
    const date = props.date.getDate();
    const month = props.date.getMonth();
    const year = props.date.getFullYear();

    return (
        <div className="ui-datepicker">
            <CalendarHeader day={getDayStr(day)} date={date} month={getMonthStr(month)} year={year} />
            <CalendarTitle month={getMonthStr(month)} year={year} />
            <CalendarTable month={month} year={year} />
        </div>
    );
};