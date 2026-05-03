describe('OrangeHRM Login Feature', () => {

  // 🔹 Config & Selector
  const url = 'https://opensource-demo.orangehrmlive.com/';
  const usernameField = 'input[name="username"]';
  const passwordField = 'input[name="password"]';
  const loginButton = 'button[type="submit"]';

  const validUsername = 'Admin';
  const validPassword = 'admin123';

  // 🔹 Buka halaman login sebelum setiap test
  beforeEach(() => {
    cy.visit(url);
  });

  // 🔹 Helper function (biar tidak ulang-ulang)
  const login = (username, password) => {
    if (username !== '') {
      cy.get(usernameField).clear().type(username);
    }
    if (password !== '') {
      cy.get(passwordField).clear().type(password);
    }
    cy.get(loginButton).click();
  };

  // ================= POSITIVE TEST =================
  it('TC01 - Login valid', () => {
    login(validUsername, validPassword);
    cy.url().should('include', '/dashboard');
  });

  it('TC08 - Username lowercase', () => {
    login('admin', validPassword);
    cy.url().should('include', '/dashboard');
  });

  it('TC12 - Copy paste (simulasi)', () => {
    login(validUsername, validPassword);
    cy.url().should('include', '/dashboard');
  });

  it('TC13 - Login dengan Enter', () => {
    cy.get(usernameField).type(validUsername);
    cy.get(passwordField).type(validPassword + '{enter}');
    cy.url().should('include', '/dashboard');
  });

  it('TC15 - Login normal (stabil)', () => {
    login(validUsername, validPassword);
    cy.url().should('include', '/dashboard');
  });

  // ================= NEGATIVE TEST =================
  it('TC02 - Password salah', () => {
    login(validUsername, 'salah123');
    cy.contains('Invalid').should('be.visible');
  });

  it('TC03 - Username salah', () => {
    login('user123', validPassword);
    cy.contains('Invalid').should('be.visible');
  });

  it('TC04 - Username kosong', () => {
    login('', validPassword);
    cy.contains('Required').should('be.visible');
  });

  it('TC05 - Password kosong', () => {
    login(validUsername, '');
    cy.contains('Required').should('be.visible');
  });

  it('TC06 - Semua field kosong', () => {
    login('', '');
    cy.contains('Required').should('be.visible');
  });

  it('TC07 - Input spasi', () => {
    login(' ', ' ');
    cy.contains('Required').should('be.visible');
  });

  it('TC09 - Password uppercase', () => {
    login(validUsername, 'ADMIN123');
    cy.contains('Invalid').should('be.visible');
  });

  it('TC10 - Username panjang', () => {
    login('a'.repeat(300), validPassword);
    cy.contains('Invalid').should('be.visible');
  });

  it('TC11 - Password panjang', () => {
    login(validUsername, 'a'.repeat(300));
    cy.contains('Invalid').should('be.visible');
  });

  it('TC14 - Caps lock password', () => {
    login(validUsername, 'ADMIN123');
    cy.contains('Invalid').should('be.visible');
  });

  it('TC16 - Special character', () => {
    login('user@123', validPassword);
    cy.contains('Invalid').should('be.visible');
  });

  it('TC17 - SQL Injection', () => {
    login("' OR 1=1 --", 'random');
    cy.contains('Invalid').should('be.visible');
  });

});