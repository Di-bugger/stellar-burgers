import Cypress from "cypress";

describe('Burger-constructor', () => {
  beforeEach(() => {
    //Мокирование API запросов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: { email: 'fake@example.com', name: 'Fake user' }
      }
    }).as('getUser');

    //Настройка аутентификации
    cy.setCookie('accessToken', 'fake-access-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
  });

  //После каждого теста очищаем от fake рефреш токена
  afterEach(() => {
    localStorage.clear();
  });

  it('Добавление булочки в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=burger-constructor]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('Добавление начинки в конструктор', () => {
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy=burger-constructor]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Открытие и закрытие модалки', () => {
    cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие модалки по клику на оверлей', () => {
     cy.contains('Биокотлета из марсианской Магнолии').click();

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').should('exist');

    // Кликаем на оверлей с force: true
    cy.get('[data-cy=modal-overlay]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=modal-overlay]').should('not.exist');
  });

  it('Создание заказа и очищение констурктора', () => {
    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Краторный био-марсианский бургер',
        order: {
          number: 85091
        }
      }
    }).as('createOrder');

    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-cy=modal]')
      .should('exist')
      .and('contain', 'Ваш заказ')
      .and('contain', '85091');

    cy.get('[data-cy=modal] button').click();

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
    cy.get('[data-cy=burger-constructor]').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});
