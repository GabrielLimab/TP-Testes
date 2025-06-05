/// <reference types="cypress" />

const timestamp = Date.now();
const uniqueName = `testuser${timestamp}`;
const uniqueEmail = `testuser${timestamp}@test.com`;
const password = 'test123';

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
    cy.clearAllCookies();
  });

  it('should be in auth url', () => {
    cy.url().should('eq', 'http://localhost:5173/auth');
  });

  it('should go to sign up page', () => {
    cy.get('.signup-link').click();
    cy.get('.text-input-container').should('have.length', 3);
  });

  it('should create a new user and get logged in', () => {
    cy.get('.signup-link').click();
    cy.get('.text-input-container').eq(0).type(uniqueName);
    cy.get('.text-input-container').eq(1).type(uniqueEmail);
    cy.get('.text-input-container').eq(2).type(password);
    cy.get('.submit-button').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
    cy.clearAllCookies();
  });

  it('should be in auth url', () => {
    cy.url().should('eq', 'http://localhost:5173/auth');
  });

  it('should display login input fields', () => {
    cy.get('.text-input-container').should('have.length', 2);
  });

  it('should login and logout', () => {
    cy.get('.text-input-container').eq(0).type(uniqueEmail);
    cy.get('.text-input-container').eq(1).type(password);
    cy.get('.submit-button').click();
    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('.logout').click();
    cy.url().should('eq', 'http://localhost:5173/auth'); 
  });
});

describe('Home Page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.wait(1000);
    cy.visit('http://localhost:5173/');
  });

  it('should not display home page if not logged in', () => {
    cy.url().should('eq', 'http://localhost:5173/auth');
  });

  it('should login and display home page', () => {
    cy.get('.text-input-container').eq(0).type(uniqueEmail);
    cy.get('.text-input-container').eq(1).type(password);
    cy.get('.submit-button').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should display 3 movie card sections', () => {
    cy.get('.text-input-container').eq(0).type(uniqueEmail);
    cy.get('.text-input-container').eq(1).type(password);
    cy.get('.submit-button').click();
    cy.get('.card-section-container').should('have.length', 3);
  });

  it('should display top rated movie card section', () => {
    cy.get('.text-input-container').eq(0).type(uniqueEmail);
    cy.get('.text-input-container').eq(1).type(password);
    cy.get('.submit-button').click();
    cy.get('.card-section-container').eq(1).contains('Melhores filmes').should('exist');
    cy.get('.card').should('exist');
  });
});

describe('Movie Page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.wait(1000);
    cy.visit('http://localhost:5173/');
    cy.login("lima@gmail.com", "123Seguro&");
    cy.visit('http://localhost:5173/movies/278');
    cy.wait(1000);
  });

  it('should display buttons watched, rate and rating', () => {
    cy.get('.watched').should('exist');
    cy.get('.rate').should('exist');
    cy.get('.rating').should('exist');
  });

  it('should change image when watched button is clicked', () => {
    cy.get('.watched').click();
    cy.get('.watched img')
    .should('have.attr', 'src')
    .then((src) => {
      expect(src).to.include('checked-box');
    });

    cy.get('.watched').click();
    cy.get('.watched img')
    .should('have.attr', 'src')
    .then((src) => {
      expect(src).to.include('check-box');
    });
  });

  it('should rate movie', () => {
    cy.get('.rate').click();
    cy.get('.rating-buttons').should('exist');
    cy.get('.rating-button').eq(10).click();
    cy.get('.rate').contains('10').should('exist');
    cy.get('.rate img')
    .should('have.attr', 'src')
    .then((src) => {
      expect(src).to.include('yellow-star');
    });
  });

  it('should display movie info', () => {
    cy.get('.movie-backdrop').should('exist');
    cy.get('.movie-banner').should('exist');
    cy.get('.genre').should('exist');
    cy.get('.plot').should('exist');
    cy.get('.director').should('exist');
    cy.get('.writers').should('exist');
    cy.get('.stars').should('exist');
    cy.get('.awards').should('exist');
  });

  it('should be able to create a review', () => {
    cy.get('button.add-review').click();

    // Type into the textarea
    cy.get('textarea#input-review').type('This is my review');

    // Click the submit button
    cy.get('div.submit-review button').click();

    // Verify that the reviews container is displayed and contains the review text
    cy.get('.reviews-container')
      .should('be.visible')
      .and('contain', 'This is my review')
  });
})

describe('Profile Page', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.wait(1000);
    cy.visit('http://localhost:5173/');
    cy.login("lima@gmail.com", "123Seguro&")
    cy.visit('http://localhost:5173/user');
    cy.wait(1000);
  });

  it('should display user info', () => {
    cy.contains('Gêneros favoritos').should('be.visible');
    cy.contains('Número de resenhas').should('be.visible');
    cy.contains('Filmes assistidos').should('be.visible');
    cy.contains('Séries assistidas').should('be.visible');
  });

  it('should display user reviews', () => {
    cy.contains('Resenhas').should('be.visible');
    cy.contains('Ver todas').should('be.visible');
  });
});

describe('Search', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.wait(1000);
    cy.visit('http://localhost:5173/');
    cy.login("lima@gmail.com", "123Seguro&")
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
  });

  it('should click on searchInput and write Game of Thrones', () => {
    cy.get('[data-testid="search-input"]')
    .click()
    .type('Game of Thrones');

    cy.get('[data-testid="search-input"]').should('have.value', 'Game of Thrones');
  });

  it('should press enter and go to search page', () => {
    cy.get('[data-testid="search-input"]')
    .click()
    .type('Game of Thrones{enter}');

    cy.url().should('include', '/search');
  });

  it('should display search results', () => {
    cy.get('[data-testid="search-input"]')
    .click()
    .type('Game of Thrones{enter}');

    cy.contains('Busca por Game of Thrones').should('be.visible');
    cy.contains('Filmes').should('be.visible');
    cy.contains('Compartilhar').should('be.visible');
  });



});