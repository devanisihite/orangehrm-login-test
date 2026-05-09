class DirectoryPage {

  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';

  directoryMenu = 'a[href*="directory"]';

  login() {

    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    cy.get(this.usernameField).type('Admin');
    cy.get(this.passwordField).type('admin123');

    cy.get(this.loginButton).click();
  }

  openDirectory() {
    cy.get(this.directoryMenu).click();
  }
}

export default DirectoryPage;