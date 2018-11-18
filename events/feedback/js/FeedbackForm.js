'use strict';

let dataForm;

function onChangeValue(event) {
    if (event.currentTarget.name == "snacks") {
        if (dataForm[event.currentTarget.name]) {
            if (event.currentTarget.checked) {
                dataForm[event.currentTarget.name].push(event.currentTarget.value);
            } else {
                const newSnacks = dataForm[event.currentTarget.name].filter(elem => elem != event.currentTarget.value);
                dataForm[event.currentTarget.name] = newSnacks;
            }
        } else {
            dataForm[event.currentTarget.name] = [event.currentTarget.value];
        }
    } else {
        dataForm[event.currentTarget.name] = event.currentTarget.value;
    }
}

const RadioInput = function ({ itemId, itemName, itemValue, itemChecked }) {
    return (
        <React.Fragment>
            <input className="contact-form__input contact-form__input--radio" id={itemId} name={itemName} type="radio" value={itemValue} defaultChecked={(itemChecked)} onChange={onChangeValue} />
            <label className="contact-form__label contact-form__label--radio" htmlFor={itemId}>{itemValue}</label>
        </React.Fragment>
    );
}

const Input = function ({ itemId, itemName, itemType, itemValue }) {
    return (
        <React.Fragment>
            <label className="contact-form__label" htmlFor={itemId}>{itemName}</label>
            <input className={`contact-form__input contact-form__input--${itemType}`} id={itemId} name={itemId} type={itemType} defaultValue={itemValue} onChange={onChangeValue} />
        </React.Fragment>
    );
}

const Select = function ({ itemId, itemName, itemValues, itemSelectValue }) {
    const options = itemValues.map(value => <option selected={(value == itemSelectValue)}>{value}</option>);
    return (
        <React.Fragment>
            <label className="contact-form__label" htmlFor={itemId}>{itemName}</label>
            <select className="contact-form__input contact-form__input--select" id={itemId} name={itemId} onChange={onChangeValue}>
                {options}
            </select>
        </React.Fragment>
    );
}

const Textarea = function ({ itemId, itemName, itemValue }) {
    return (
        <React.Fragment>
            <label className="contact-form__label" htmlFor={itemId}>{itemName}</label>
            <textarea className="contact-form__input contact-form__input--textarea" id={itemId} name={itemId} onChange={onChangeValue} rows="6" cols="65">{itemValue}</textarea>
        </React.Fragment>
    );
}

const Checkbox = function ({ itemId, itemName, itemValue, itemLabel, itemChecked }) {
    return (
        <React.Fragment>
            <input className="contact-form__input contact-form__input--checkbox" id={itemId} name={itemName} type="checkbox" value={itemValue} defaultChecked={(itemChecked)} onChange={onChangeValue} />
            <label className="contact-form__label contact-form__label--checkbox" htmlFor={itemId}>{itemLabel}</label>
        </React.Fragment>
    );
}

const GroupCheckbox = function ({ itemName, itemValues, checkedValues }) {
    return (
        <React.Fragment>
            <p className="contact-form__label--checkbox-group">{itemName}</p>
            {itemValues.map(item => <Checkbox itemId={item.id} itemName={item.name} itemValue={item.value} itemLabel={item.label} itemChecked={checkedValues.find(elem => (item.value == elem))} />)}
        </React.Fragment>
    );
}

const FeedbackForm = function ({ data, onSubmit }) {
    const nameRadioInput = "salutation";
    const arrayRadioInputValue = [
        { id: "salutation-mr", value: "Мистер" },
        { id: "salutation-mrs", value: "Мисис" },
        { id: "salutation-ms", value: "Мис" }
    ];
    const arraySelectValue = ["У меня проблема", "У меня важный вопрос"];
    const arrayCheckbox = [
        { id: "snacks-pizza", name: "snacks", label: "Пиццу", value: "пицца" },
        { id: "snacks-cake", name: "snacks", label: "Пирог", value: "пирог" }
    ];

    dataForm = data;

    function submitForm(event) {
        event.preventDefault();
        onSubmit(JSON.stringify(dataForm));
    }

    return (
        <form className="content__form contact-form">
            <div className="testing">
                <p>Чем мы можем помочь?</p>
            </div>
            <div className="contact-form__input-group">
                {arrayRadioInputValue.map(item => <RadioInput itemId={item.id} itemName={nameRadioInput} itemValue={item.value} itemChecked={(data.salutation == item.value)} />)}
            </div>
            <div className="contact-form__input-group">
                <Input itemId="name" itemName="Имя" itemType="text" itemValue={data.name} />
            </div>
            <div className="contact-form__input-group">
                <Input itemId="email" itemName="Адрес электронной почты" itemType="email" itemValue={data.email} />
            </div>
            <div className="contact-form__input-group">
                <Select itemId="subject" itemName="Чем мы можем помочь?" itemValues={arraySelectValue} itemSelectValue={data.subject} />
            </div>
            <div className="contact-form__input-group">
                <Textarea itemId="message" itemName="Ваше сообщение" itemValue={data.message} />
            </div>
            <div className="contact-form__input-group">
                <GroupCheckbox itemName="Хочу получить:" itemValues={arrayCheckbox} checkedValues={data.snacks} />
            </div>
            <button className="contact-form__button" type="submit" onClick={submitForm}>Отправить сообщение!</button>
            <output id="result" />
        </form>
    );
}