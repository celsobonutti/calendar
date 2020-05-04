/// <reference types="cypress" />
/// <reference types="cypress-react-unit-test" />
import React from 'react';
import { mount } from 'cypress-react-unit-test';
import format from 'date-fns/format';

import { DaySummary } from './DaySummary';
import { ReminderProvider } from '../../stores/';

describe('Reminders', () => {
  let date = new Date(2021, 6, 11);
  let orange = 'rgb(255, 153, 0)';
  let red = 'rgb(153, 51, 51)';

  let title = 'Reminder for the future!';
  let secondTitle = 'New title!';

  before(() => {
    mount(
      <ReminderProvider>
        <DaySummary date={date} />
      </ReminderProvider>
    );
  });

  beforeEach(() => {
    cy.get('[data-cy=day-reminders]').as('reminders');
  });

  it('Creates an orange reminder for the selected day', () => {
    cy.get('@reminders').should('be.empty');

    cy.get('[data-cy=add-reminder]').click();

    cy.get('[name=title]').type(title);
    cy.get('[class*=-picker]').children().first().next().click();
    cy.get('[name=city]').type('Salvador');

    cy.get('[data-cy=save-reminder]').click();

    cy.get('@reminders').children().its('length').should('be', 1);
    cy.get('@reminders').children().first().as('added-reminder');
    cy.get('@added-reminder')
      .should('contain', title)
      .should('contain', format(date, 'hh:mm a'))
      .should('have.css', 'background-color')
      .and('eq', orange);
  });

  it('Edits the created reminder', () => {
    cy.get('@reminders').should('not.be.empty');

    cy.get('@reminders').children().first().as('old-reminder');
    cy.get('@old-reminder').children().find('[data-cy=edit-button]').click();

    cy.get('[name=title]').clear().type(secondTitle);
    cy.get('[class*=-picker]').children().first().click();
    cy.get('[data-cy=save-reminder]').click();

    cy.get('@old-reminder')
      .should('contain', secondTitle)
      .should('have.css', 'background-color')
      .and('eq', red);
  });

  it('Removes the created reminder', () => {
    cy.get('@reminders').should('not.be.empty');

    cy.get('@reminders').children().first().as('reminder');
    cy.get('@reminder').children().find('[data-cy=delete-button]').click();
    cy.get('[data-cy=confirmation-confirm]').click();

    cy.get('@reminders').should('be.empty');
  })

  after(() => {
    localStorage.removeItem('reminders');
  });
});
