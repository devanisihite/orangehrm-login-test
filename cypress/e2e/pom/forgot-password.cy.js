import ForgotPasswordPage from '../../pages/ForgotPasswordPage';

describe('Forgot Password Feature', () => {

  const forgot = new ForgotPasswordPage();

  beforeEach(() => {
    forgot.visit();
  });

  // ✅ TC01
  it('TC01 - Reset password request', () => {

    forgot.clickForgotPassword();

    forgot.inputUsername('Admin');

    forgot.clickResetButton();

    cy.url().should('include', 'sendPasswordReset');
  });

  // ✅ TC02
  it('TC02 - Username kosong', () => {

    forgot.clickForgotPassword();

    forgot.clickResetButton();

    cy.contains('Required').should('be.visible');
  });

});