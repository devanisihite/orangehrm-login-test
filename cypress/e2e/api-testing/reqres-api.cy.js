describe('Reqres API Automation', () => {

    const baseUrl = 'https://reqres.in/api';

    const apiKey = 'free_user_3DRdYmaN51TtK4XaKf9F5cXDsw7';

    // 1. GET LIST USERS
    it('GET List Users', () => {

        cy.request({
            method: 'GET',
            url: `${baseUrl}/users?page=2`,
            headers: {
                'x-api-key': apiKey
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.page).to.eq(2);

        });

    });

    // 2. GET SINGLE USER
    it('GET Single User', () => {

        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/2`,
            headers: {
                'x-api-key': apiKey
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(2);

        });

    });

    // 3. USER NOT FOUND
    it('GET User Not Found', () => {

        cy.request({
            method: 'GET',
            url: `${baseUrl}/users/23`,
            headers: {
                'x-api-key': apiKey
            },
            failOnStatusCode: false

        }).then((response) => {

            expect(response.status).to.eq(404);

        });

    });

    // 4. CREATE USER
    it('POST Create User', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/users`,
            headers: {
                'x-api-key': apiKey
            },
            body: {
                name: 'Devani',
                job: 'QA Engineer'
            }

        }).then((response) => {

            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq('Devani');

        });

    });

    // 5. UPDATE USER
    it('PUT Update User', () => {

        cy.request({
            method: 'PUT',
            url: `${baseUrl}/users/2`,
            headers: {
                'x-api-key': apiKey
            },
            body: {
                name: 'Devani Updated',
                job: 'Senior QA'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);

        });

    });

    // 6. PATCH USER
    it('PATCH User', () => {

        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/users/2`,
            headers: {
                'x-api-key': apiKey
            },
            body: {
                job: 'Automation Tester'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);

        });

    });

   // 8. LOGIN SUCCESS
    it('POST Login Success', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            headers: {
                'x-api-key': apiKey
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.token).to.exist;

        });

    });

    // 9. LOGIN FAILED
    it('POST Login Failed', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            headers: {
                'x-api-key': apiKey
            },
            failOnStatusCode: false,
            body: {
                email: 'peter@klaven'
            }

        }).then((response) => {

            expect(response.status).to.eq(400);

        });

    });

    // 10. REGISTER SUCCESS
    it('POST Register Success', () => {

        cy.request({
            method: 'POST',
            url: `${baseUrl}/register`,
            headers: {
                'x-api-key': apiKey
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.id).to.exist;

        });

    });

});