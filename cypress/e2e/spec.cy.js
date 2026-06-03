describe('Moviedle - Testes E2E', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('deve carregar a página com o título Moviedle', () => {
        cy.get('h1').should('contain', 'Moviedle')
    })

    it('deve exibir a tela de login ao carregar', () => {
        cy.get('.login').should('be.visible')
        cy.get('#inputLoginBox').should('exist')
        cy.get('#buttonLoginBox').should('exist')
    })

    it('deve fechar o login ao inserir uma tag válida', () => {
        cy.get('#inputLoginBox').type('AAAA')
        cy.get('#buttonLoginBox').click()
        cy.get('.login').should('not.be.visible')
    })

    it('deve ter o input de filme e o botão enviar', () => {
        cy.get('#inputLoginBox').type('TEST')
        cy.get('#buttonLoginBox').click()
        cy.get('#inputNomeFilme').should('exist')
        cy.get('#buttonNomeFilme').should('contain', 'Enviar')
    })

    it('deve digitar no input de filme', () => {
        cy.get('#inputLoginBox').type('TEST')
        cy.get('#buttonLoginBox').click()
        cy.get('#inputNomeFilme').type('Matrix')
        cy.get('#inputNomeFilme').should('have.value', 'Matrix')
    })

})