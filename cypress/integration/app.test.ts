describe('App', () => {
  it('Card CreateボタンをクリックしBoardにCardの作成', () => {
    cy.visit('/')
    cy.get('[data-testid=card-create-button]').click()
    cy.get('[data-testid=title-input]').type('test title')
    cy.get('[data-testid=body-textarea]').type('test body')
    cy.get('select').select('todo')
    cy.get('[data-testid=card-modal-close-button').click()
    cy.get('[data-testid=card-1]').trigger('mouseover')
    cy.get('[data-testid=card-1]').click()
    cy.get('[data-testid=card-modal-close-button').click()
  })
})
