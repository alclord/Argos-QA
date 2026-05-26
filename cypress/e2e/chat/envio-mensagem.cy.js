/**
 * Suite: Envio de Mensagem — Chat (Canário)
 *
 * Contato de teste: configurado via TEST_CONTACT_CHAT_UUID no .env
 * Chat UUID: Cypress.env('CHAT_UUID_TEST')
 *
 * Mapeamento de seletores (validados no canário em 2026-05-20):
 *   - Input:            .tiptap.ProseMirror  (TipTap contenteditable)
 *   - Enviar:           {enter} no editor  (Enter envia, Shift+Enter nova linha)
 *   - Canal seletor:    [data-testid="channel-selector-button-trigger"]
 *   - Mais opções:      [data-testid="dropdown-button"]
 *   - Status mensagem:  .sr-only com texto "Entregue" | "Lido" | "Enviado"
 *   - Login email:      input#email
 *   - Login senha:      input#password
 *   - Login botão:      button:contains("Login")
 */

describe('Envio de Mensagem - Canário', () => {
  const CHAT_UUID = Cypress.env('CHAT_UUID_TEST');

  // Timestamp único para identificar a mensagem desta execução
  const RUN_ID = Date.now();
  const MSG_SIMPLES = `Argos QA - envio simples [${RUN_ID}]`;
  const MSG_ESPECIAL = `Argos QA - *negrito* e _itálico_ [${RUN_ID}]`;

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.login(); // restaura sessão do cache
    cy.visit(`/chat/${CHAT_UUID}`);
    // Aguarda o editor ficar visível antes de cada teste
    cy.get('.tiptap.ProseMirror').should('be.visible');
  });

  // ─────────────────────────────────────────────
  // CT01 — Envio de mensagem de texto simples
  // ─────────────────────────────────────────────
  it('CT01 - deve enviar mensagem de texto via Enter', () => {
    cy.sendMessage(MSG_SIMPLES);

    // Input deve ser limpo imediatamente após o envio
    cy.get('.tiptap.ProseMirror').should('have.text', '');

    // A mensagem deve aparecer na timeline da conversa
    cy.contains('p', MSG_SIMPLES).should('be.visible');
  });

  // ─────────────────────────────────────────────
  // CT02 — Input limpo após envio
  // ─────────────────────────────────────────────
  it('CT02 - input deve ser limpo imediatamente após o envio', () => {
    cy.typeMessage('Mensagem de teste de limpeza');
    cy.get('.tiptap.ProseMirror').should('not.have.text', '');

    cy.get('.tiptap.ProseMirror').type('{enter}');

    cy.get('.tiptap.ProseMirror').should('have.text', '');
  });

  // ─────────────────────────────────────────────
  // CT03 — Status da mensagem exibido após envio
  // ─────────────────────────────────────────────
  it('CT03 - deve exibir status Entregue ou Enviado após envio', () => {
    cy.sendMessage(`Argos QA - status check [${RUN_ID}]`);

    // Aguarda o status aparecer (sr-only acessível à leitura de tela)
    cy.get('.sr-only')
      .contains(/Entregue|Enviado|Lido/)
      .should('exist');
  });

  // ─────────────────────────────────────────────
  // CT04 — Canal WhatsApp selecionado por padrão
  // ─────────────────────────────────────────────
  it('CT04 - canal WhatsApp deve estar selecionado no composer', () => {
    cy.get('[data-testid="channel-selector-button-trigger"]')
      .should('be.visible')
      .and('contain.text', 'WhatsApp');
  });

  // ─────────────────────────────────────────────
  // CT05 — Enter vazio não envia mensagem
  // ─────────────────────────────────────────────
  it('CT05 - Enter sem texto não deve enviar mensagem vazia', () => {
    // Garante que o input está vazio
    cy.get('.tiptap.ProseMirror').should('have.text', '');

    // Registra quantas mensagens existem antes do Enter vazio
    cy.get('p').then(($before) => {
      const countBefore = $before.length;

      cy.get('.tiptap.ProseMirror').click().type('{enter}');

      // O número de mensagens não deve ter aumentado
      cy.get('p').should(($after) => {
        expect($after.length).to.be.lte(countBefore);
      });
    });

    // Input deve continuar vazio
    cy.get('.tiptap.ProseMirror').should('have.text', '');
  });

  // ─────────────────────────────────────────────
  // CT06 — Mensagem com caracteres especiais/formatação
  // ─────────────────────────────────────────────
  it('CT06 - deve enviar mensagem com formatação WhatsApp (*negrito* e _itálico_)', () => {
    cy.sendMessage(MSG_ESPECIAL);

    cy.get('.tiptap.ProseMirror').should('have.text', '');
    cy.contains('p', /Argos QA - /).should('be.visible');
  });

  // ─────────────────────────────────────────────
  // CT07 — Mensagem longa (limite de caracteres)
  // ─────────────────────────────────────────────
  it('CT07 - deve enviar mensagem com texto longo (500 chars)', () => {
    const msgLonga = `Argos QA [${RUN_ID}] ${'a'.repeat(460)}`;

    cy.typeMessage(msgLonga);
    cy.get('.tiptap.ProseMirror').type('{enter}');

    cy.get('.tiptap.ProseMirror').should('have.text', '');
    cy.contains('p', /Argos QA/).should('be.visible');
  });
});
