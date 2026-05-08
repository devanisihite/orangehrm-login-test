class LoginPage {

  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  inputUsername(username) {
    cy.get(this.usernameField).clear().type(username);
  }

  inputPassword(password) {
    cy.get(this.passwordField).clear().type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {

    if (username !== '') {
      this.inputUsername(username);
    }

    if (password !== '') {
      this.inputPassword(password);
    }

    this.clickLogin();
  }
}

export default LoginPage;