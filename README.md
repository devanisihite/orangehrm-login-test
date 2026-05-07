# OrangeHRM Login Automation Test

## 🛠 Tools
- Cypress

## 🌐 Website Under Test
https://opensource-demo.orangehrmlive.com/

## 📋 Test Cases
- TC01 Login valid  
- TC02 Password salah  
- TC03 Username salah  
- TC04 Username kosong  
- TC05 Password kosong  
- TC06 Semua field kosong  
- TC07 Input spasi  
- TC08 Username lowercase  
- TC09 Password uppercase  
- TC10 Username panjang  
- TC11 Password panjang  
- TC12 Copy paste  
- TC13 Enter key  
- TC14 Caps lock  
- TC15 Login normal  
- TC16 Special character  
- TC17 SQL Injection  

## 🔍 Intercept Testing

File:
- login-intercept.cy.js

Intercept yang digunakan:
- POST /auth/validate
- GET /dashboard/employees/action-summary
- GET /buzz/feed
- GET /time-at-work
- GET /dashboard/shortcuts
- GET /dashboard/employees/locations
- GET /dashboard/employees/subunit
- GET /dashboard/employees/leaves
- POST /events/push
- GET /dashboard/index

✅ Semua intercept berhasil dijalankan dan passed.

## ▶️ Cara Menjalankan
```bash
npm install
npx cypress open
