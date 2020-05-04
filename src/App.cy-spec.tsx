/// <reference types="cypress" />
/// <reference types="cypress-react-unit-test" />
import React from 'react';
import { mount } from 'cypress-react-unit-test';
import App from './App';
import format from 'date-fns/format';

describe('Reminders', () => {
  let title = 'This is a reminder. :)';
  let red = 'rgb(153, 51, 51)';

  let otherTitle = 'This is also a reminder. :D';
  let orange = 'rgb(255, 153, 0)';

  before(() => {
    localStorage.removeItem('reminders');
    mount(<App />);
  });

  beforeEach(() => {
    cy.get('[data-cy=add-reminder-general]').click();

    cy.get('[name=city]').type('Salvador');
  });

  it('Creates a reminder for today', () => {
    cy.get('[name=title]').type(title);
    cy.get('[class*=-picker]').children().first().click();
    cy.get('[name=datetime]').click();
    cy.get('[class*=rdtToday]').click();

    cy.get('[data-cy=save-reminder]').click();

    let today = format(new Date(), 'yyyy-MM-dd');

    cy.get(`[data-value=${today}]`).within(() => {
      cy.get('[data-cy=date-reminders]').as('today-reminders');
      cy.get('@today-reminders').children().should('not.be.empty');
      cy.get('@today-reminders')
        .find('div')
        .should('contain', title)
        .should('contain', '12:00 AM')
        .should('have.css', 'background-color')
        .and('eq', red);
    });
  });

  it('Creates a reminder for day 7 of this month', () => {
    cy.get('[class*=CurrentMonth]').then((month) => {
      cy.get('[class*=CurrentYear]').then((year) => {
        let currentMonth = month.attr('data-month') - 1;
        let currentYear = year.attr('data-year');

        let date = new Date(currentYear, currentMonth, 7);

        let formattedDate = format(date, 'MM/dd/yyyy 10:59');

        cy.get('[name=title]').type(otherTitle);
        cy.get('[class*=-picker]').children().first().next().click();    

        cy.get('[name=datetime]').type(`${formattedDate} p`);
        cy.get('[data-cy=save-reminder]').click();

        formattedDate = format(date, 'yyyy-MM-dd');

        cy.get(`[data-value=${formattedDate}]`).within(() => {
          cy.get('[data-cy=date-reminders]').as('today-reminders');
          cy.get('@today-reminders').children().should('not.be.empty');
          cy.get('@today-reminders')
            .find('div')
            .should('contain', otherTitle)
            .should('contain', '10:59 PM')
            .should('have.css', 'background-color')
            .and('eq', orange);
        });
      });
    });
  });

  after(() => {
    localStorage.removeItem('reminders');
  });
});
