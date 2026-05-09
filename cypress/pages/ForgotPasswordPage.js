class ForgotPasswordPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  clickResetButton() {
    cy.get('button[type="submit"]').click({ force: true });
  }

}

export default ForgotPasswordPage;