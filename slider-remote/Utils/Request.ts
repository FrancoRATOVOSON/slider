import Axios from "axios";

export function Send(
    url: string,
    command: string
): { result: boolean; response: string } {
    var answer: { result: boolean; response: string } = {
        result: true,
        response: "Success",
    };
    Axios.post(url, { command: command })
        .then((response) => {
            answer = { result: true, response: response.data };
        })
        .catch((error) => (answer = { result: false, response: error }));
    return answer;
}
