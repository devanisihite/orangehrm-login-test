import LoginPage from '../pages/LoginPage';
import data from '../fixtures/loginData.json';

describe('OrangeHRM Login Final Project', () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  // ✅ TC01
  it('TC01 - Login valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginAPI');

    loginPage.login(data.validUsername, data.validPassword);

    cy.wait('@loginAPI');

    cy.url().should('include', '/dashboard');
  });

  // ✅ TC02
  it('TC02 - Password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('invalidLogin');

    loginPage.login(data.validUsername, data.wrongPassword);

    cy.wait('@invalidLogin');

    cy.contains('Invalid').should('be.visible');
  });

  // ✅ TC03
  it('TC03 - Username salah', () => {

    loginPage.login(data.wrongUsername, data.validPassword);

    cy.contains('Invalid').should('be.visible');
  });

  // ✅ TC04
  it('TC04 - Username kosong', () => {

    loginPage.login('', data.validPassword);

    cy.contains('Required').should('be.visible');
  });

  // ✅ TC05
  it('TC05 - Password kosong', () => {

    loginPage.login(data.validUsername, '');

    cy.contains('Required').should('be.visible');
  });

});