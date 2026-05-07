describe('OrangeHRM Login Feature', () => {

  // 🔹 Config & Selector
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  const usernameField = 'input[name="username"]';
  const passwordField = 'input[name="password"]';
  const loginButton = 'button[type="submit"]';

  const validUsername = 'Admin';
  const validPassword = 'admin123';

  // 🔹 Buka halaman login sebelum setiap test
  beforeEach(() => {
    cy.visit(url, { timeout: 120000 });
  });

  // 🔹 Helper function
  const login = (username, password) => {

    if (username !== '') {
      cy.get(usernameField, { timeout: 120000 })
        .should('be.visible')
        .clear()
        .type(username);
    }

    if (password !== '') {
      cy.get(passwordField, { timeout: 120000 })
        .should('be.visible')
        .clear()
        .type(password);
    }

    cy.get(loginButton).click();
  };

  // ================= POSITIVE TEST =================

  it('TC01 - Login valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginAPI');

    login(validUsername, validPassword);

    cy.wait('@loginAPI', { timeout: 120000 })
      .its('response.statusCode')
      .should('eq', 302);

    cy.url().should('include', '/dashboard');
  });

  it('TC08 - Username lowercase', () => {

    cy.intercept('GET', '**/dashboard/employees/action-summary').as('actionSummary');

    login('admin', validPassword);

    cy.wait('@actionSummary', { timeout: 120000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  it('TC12 - Copy paste (simulasi)', () => {

    cy.intercept('GET', '**/buzz/feed*').as('buzzFeed');

    login(validUsername, validPassword);

    cy.wait('@buzzFeed', { timeout: 120000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  it('TC13 - Login dengan Enter', () => {

    cy.intercept('GET', '**/time-at-work*').as('timeAtWork');

    cy.get(usernameField)
      .should('be.visible')
      .type(validUsername);

    cy.get(passwordField)
      .should('be.visible')
      .type(validPassword + '{enter}');

    cy.wait('@timeAtWork', { timeout: 120000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  it('TC15 - Login normal (stabil)', () => {

    cy.intercept('GET', '**/dashboard/shortcuts').as('shortcuts');

    login(validUsername, validPassword);

    cy.wait('@shortcuts', { timeout: 120000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.url().should('include', '/dashboard');
  });

  // ================= NEGATIVE TEST =================

  it('TC02 - Password salah', () => {

    cy.intercept('GET', '**/dashboard/employees/locations').as('locations');

    login(validUsername, 'salah123');

    cy.contains('Invalid').should('be.visible');
  });

  it('TC03 - Username salah', () => {

    cy.intercept('GET', '**/dashboard/employees/subunit').as('subunit');

    login('user123', validPassword);

    cy.contains('Invalid').should('be.visible');
  });

  it('TC04 - Username kosong', () => {

    cy.intercept('GET', '**/dashboard/employees/leaves*').as('leaves');

    login('', validPassword);

    cy.contains('Required').should('be.visible');
  });

  it('TC05 - Password kosong', () => {

    cy.intercept('POST', '**/events/push').as('pushEvent');

    login(validUsername, '');

    cy.contains('Required').should('be.visible');
  });

  it('TC06 - Semua field kosong', () => {

    cy.intercept('GET', '**/dashboard/index').as('dashboardPage');

    login('', '');

    cy.contains('Required').should('be.visible');
  });

});