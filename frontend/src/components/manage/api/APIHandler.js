export default class APIHandler {

    /**
     * Performs a GET request and returns the results as an object.
     * @param {String} url 
     * @param {Object} args 
     * @returns The result as an object.
     */
    static async getRequest(url, args) {
        let firstArgument = true;
        Object.entries(args).forEach(entry => {
            const [key, value] = entry;
            url += `${firstArgument ? '?' : '&'}${key}=${value}`;
            firstArgument = false;
        });

        const response = await fetch(url);
        return response.json();
    }

    /**
     * Performs a POST request and returns the results as an object
     * @param {String} url 
     * @param {Object} args 
     * @returns The result as an object.
     */
    static async postRequest(url, args) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(args)
            });

            return response.json();
        } catch (e) {
            return e;
        }
    }
}