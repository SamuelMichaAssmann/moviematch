export default class APIHandler {

    /**
     * Performs a GET request and returns the results as an object.
     * @param {String} url 
     * @param {Object} args 
     * @returns The result as an object.
     */
    static async getRequest(url, args, returnRawResponse=false) {
        let firstArgument = true;
        Object.entries(args).forEach(entry => {
            const [key, value] = entry;
            url += `${firstArgument ? '?' : '&'}${key}=${value}`;
            firstArgument = false;
        });

        const response = await fetch(url);
        if (returnRawResponse) {
            return response;
        }

        return response.json();
    }

    /**
     * Performs a POST request and returns the results as an object.
     * @param {String} url 
     * @param {Object} args 
     * @returns The result as an object.
     */
    static async postRequest(url, args, returnRawResponse=false) {
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

            if (returnRawResponse) {
                return response;
            }
            
            return response.json();
        } catch (e) {
            return e;
        }
    }

    /**
     * Requests a new verification email for the current user.
     * Also handles refreshing tokens if necessary.
     * @returns The response object of the request.
     */
    static async resendVerificationEmail() {
        try {
            const response = this.postRequest('http://127.0.0.1:5000/api/resendVerificationEmail', {
                token: localStorage.getItem('token'),
                refreshToken: localStorage.getItem('refreshToken')
            });

            if (!('message' in response)) {
                // Store new tokens if they had to be refreshed.
                if ('newToken' in response && response.newToken !== '') {
                    localStorage.setItem('token', response.newToken);
                }
                if ('newRefreshToken' in response && response.newRefreshToken !== '') {
                    localStorage.setItem('refreshToken', response.newRefreshToken);
                }
            }

            return response;
        } catch (e) {
            return e;
        }
    }
}