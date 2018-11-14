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

const CalendarHeader = function ({day, date, month, year}) {
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

const CalendarTitle = function ({month, year}) {
    return (
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
            </div>
        </div>
    );
}

const CalendarTableRow = function (props) {
    return (
        <tr>
            {props.row.map((item) => <td className={item.className}>{item.day}</td>)}
        </tr>
    );
}

const CalendarTable = function ({date, month, year}) {
    let firstDay = new Date(year, month);
    let lastDay = new Date(year, month + 1);
    let arrayWeek = [];

    if (firstDay.getDay() != 1) {
        let dayNum = 6; //Воскресенье
        if (firstDay.getDay() != 0) {
            dayNum = (firstDay.getDay() - 1);
        }
        firstDay.setDate(firstDay.getDate() - dayNum);
    }

    while (firstDay) {
        let classElement;

        //если понедельник и следующий месяц, то выходим из цикла
        if ((firstDay.getDay() == 1) && (firstDay >= lastDay)) {
            break;
        }

        //если понедельник
        if (firstDay.getDay() == 1) {
            arrayWeek.push([]);
        }

        //проверяем какой сейчас месяц и день
        if (firstDay.getMonth() != month) {
            classElement = "ui-datepicker-other-month";
        } else if (firstDay.getDate() == date) {
            classElement = "ui-datepicker-today";
        }

        arrayWeek[arrayWeek.length - 1].push({ "day": firstDay.getDate(), "className": classElement });
        firstDay.setDate(firstDay.getDate() + 1);
    }

    return (
        <table className="ui-datepicker-calendar">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="ui-datepicker-week-end" />
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
                {arrayWeek.map((item) => <CalendarTableRow row={item} />)}
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
            <CalendarTable date={date} month={month} year={year} />
        </div>
    );
};
