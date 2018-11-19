'use strict';

const form = {
    name: "",
    email: "",
    password: ""
};

const InputForm = function ({ placeholder, type, onChange }) {
    return (
        <div className="Input">
            <input required type={type} placeholder={placeholder} ref={element => form[(type == "text") ? "name" : type] = element.value} onChange={onChange} />
            <label />
        </div>
    );
}

const AuthForm = function ({ onAuth }) {

    const arrayInput = [
        { type: "text", placeholder: "Имя" },
        { type: "email", placeholder: "Электронная почта" },
        { type: "password", placeholder: "Пароль" }
    ];

    function onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    function changeInput(event) {
        if (event.currentTarget.type == "email") {
            event.currentTarget.value = event.currentTarget.value.replace(/[^a-zA-Z0-9\@\.\_\-]/g, "");
        } else if (event.currentTarget.type == "password") {
            event.currentTarget.value = event.currentTarget.value.replace(/\W/g, "");
        }
        form[(event.currentTarget.type == "text") ? "name" : event.currentTarget.type] = event.currentTarget.value;
    }

    function submitForm(event) {
        event.preventDefault();
        if (typeof onAuth === "function") {
            onAuth(form);
        }
    }

    return (
        <form className="ModalForm" action="/404/auth/" method="POST" onKeyPress={onKeyPress}>
            {arrayInput.map((elem, index) => <InputForm type={elem.type} placeholder={elem.placeholder} onChange={changeInput} />)}
            <button type="submit" onClick={submitForm} >
                <span>Войти</span>
                <i className="fa fa-fw fa-chevron-right" />
            </button>
        </form>
    );
}