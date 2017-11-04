const isProductionEnviroment = process.env.NODE_ENV === 'production';

const localRepository = {

    clear: function () {
        localStorage.clear();
    },

    isProductionEnvironment: {
        get: function () {
            return isProductionEnviroment;
        }
    },

    appUrl: {
        get: function () {
            return "https://pmi-jobs-database.firebaseapp.com/";
        }
    },

    supportEmail: {
        get: function () {
            return "c.escalante.ar@ieee.org";
        }
    },

    isAuthenticated: {
        get: function () {
            return localStorage.isAuthenticated ? JSON.parse(localStorage.isAuthenticated) : false;
        },
        set: function (isAuthenticated) {
            localStorage.isAuthenticated = JSON.stringify(isAuthenticated);
        }
    },

    isAuthorized: {
        get: function () {
            return localStorage.isAuthorized ? JSON.parse(localStorage.isAuthorized) : false;
        },
        set: function (isAuthorized) {
            localStorage.isAuthorized = JSON.stringify(isAuthorized);
        }
    },

    currentUserID: {
        get: function () {
            return localStorage.currentUserID ? JSON.parse(localStorage.currentUserID) : null;
        },
        set: function (currentUserID) {
            localStorage.currentUserID = currentUserID ? JSON.stringify(currentUserID) : null;
        }
    },

    clearances: {
        get: function () {
            return localStorage.clearances ? JSON.parse(localStorage.clearances) : null;
        },
        set: function (clearances) {
            localStorage.clearances = clearances ? JSON.stringify(clearances) : null;
        }
    }

}

export default localRepository