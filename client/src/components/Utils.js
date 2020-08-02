
export const parseData = (data) =>
    data ? JSON.parse(JSON.stringify(data)) : data;

export const validateEmail = (email) => {
    /*eslint-disable */
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*eslint-enable */
    return regex.test(String(email).toLowerCase());
}