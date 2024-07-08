// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function () {
    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', function () {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    const longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,vTeste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'
    cy.get('#firstName').type('Rafaela')
    cy.get('#lastName').type('Uchôa')
    cy.get('#email').type('rafa@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()


    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Rafaela')
    cy.get('#lastName').type('Uchôa')
    cy.get('#email').type('rafa@exemplo,.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com o valor não é númerico', function () {
    cy.get('#phone')
      .type('abcdefghijkl')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Rafaela')
    cy.get('#lastName').type('Uchôa')
    cy.get('#email').type('rafa@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .type('Rafa')
      .should('have.value', 'Rafa')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('uchôa')
      .should('have.value', 'uchôa')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('rafa@exemplo.com')
      .should('have.value', 'rafa@exemplo.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
cy.fillMandatoryFieldsAndSubmit()

cy.get('.success').should('be.visible')
  })

})
