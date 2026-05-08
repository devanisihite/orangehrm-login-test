import LoginPage from '../../pages/LoginPage';
import data from '../../fixtures/loginData.json';

describe('OrangeHRM Login POM Feature', () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC01 - Login valid', () => {

    loginPage.login(data.validUsername, data.validPassword);

    cy.url().should('include', '/dashboard');
  });

  it('TC02 - Password salah', () => {

    loginPage.login(data.validUsername, data.wrongPassword);

    cy.contains('Invalid').should('be.visible');
  });

  it('TC03 - Username salah', () => {

    loginPage.login(data.wrongUsername, data.validPassword);

    cy.contains('Invalid').should('be.visible');
  });

  it('TC04 - Username kosong', () => {

    loginPage.login('', data.validPassword);

    cy.contains('Required').should('be.visible');
  });

  it('TC05 - Password kosong', () => {

    loginPage.login(data.validUsername, '');

    cy.contains('Required').should('be.visible');
  });

});