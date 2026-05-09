import DirectoryPage from '../pages/DirectoryPage';

describe('Directory Feature', () => {

  const directory = new DirectoryPage();

  beforeEach(() => {

    directory.login();
  });

  it('TC01 - Open Directory', () => {

    cy.intercept('GET', '**/directory/**').as('directoryPage');

    directory.openDirectory();

    cy.wait('@directoryPage');

    cy.url().should('include', '/directory');
  });

});