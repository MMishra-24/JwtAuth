const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
//For Register Page
const registerView = (req, res) => {
    res.render("register", {
    } );
}

// For View 
const loginView = (req, res) => {
    res.render("login", {
    } );
}


const dashboardView = async (req, res) => {
    res.render("dashboard", { movies: []
    });
};

module.exports = {
    registerView,
    loginView,
    dashboardView
  };