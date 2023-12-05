
class CookieHandler {
    getCookie(name) {
        let cookies = document.cookie
            .split(";")
            .map((cookie) => cookie.split("="))
            .reduce(
                (accumulator, [key, value]) => ({
                    ...accumulator,
                    [key.trim()]: decodeURIComponent(value),
                }),
                {}
            );

        return cookies[name];
    }

    setCookie(cname, value, age) {
        let nameAndValue = `${encodeURIComponent(cname)}=${encodeURIComponent(
            value
        )}`;
        const date = new Date();
        date.setTime(date.getTime() + CookieHandler.convertToMilliSeconds(age));
        document.cookie = `${nameAndValue};expires=${date.toUTCString()}`;
    }

    deleteCookie(name) {
        document.cookie = `${name}=expired;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    static convertToMilliSeconds(obj) {
        if (obj["seconds"]) return obj["seconds"] * 1000;
        if (obj["minutes"]) return obj["minutes"] * 60 * 1000;
        if (obj["hours"]) return obj["hours"] * 60 * 60 * 1000;
        if (obj["days"]) return obj["days"] * 24 * 60 * 60 * 1000;
        console.error('The time unit entered is not valid.');
        return null;
    };
}