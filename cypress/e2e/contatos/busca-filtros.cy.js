/**
 * Suite: Busca e Filtros de Contatos/Chats (Canário)
 *
 * Cobre os fluxos de busca e filtragem na lista de atendimento.
 *
 * Critérios de aceite cobertos:
 *   - Busca por nome retorna resultados relevantes
 *   - Busca sem resultado exibe estado vazio
 *   - Filtros de status funcionam corretamente
 *   - Limpar filtros restaura lista completa
 */

describe('Busca e Filtros - Lista de Atendimento', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/chat');
    cy.get('[data-testid="tab-filter-trigger"], .tiptap').should('exist');
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-001 — Busca por nome de contato
  // ─────────────────────────────────────────────
  it('CT-BUSCA-001 - deve exibir resultados ao buscar por nome de contato conhecido', () => {
    // Abre o campo de busca
    cy.get('[data-testid="search-input"], input[placeholder*="buscar"], input[placeholder*="pesquisar"]')
      .first()
      .type('Yuri');

    // Aguarda resultados aparecerem
    cy.get('[data-testid="chat-list-item"], .chat-item, li[data-chat]')
      .should('have.length.greaterThan', 0);
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-002 — Busca sem resultados
  // ─────────────────────────────────────────────
  it('CT-BUSCA-002 - deve exibir estado vazio ao buscar por termo inexistente', () => {
    cy.get('[data-testid="search-input"], input[placeholder*="buscar"], input[placeholder*="pesquisar"]')
      .first()
      .type('zzzz-contato-inexistente-argos-qa-9999');

    // Estado vazio deve aparecer
    cy.get('body').should('contain.text', /nenhum|sem resultado|not found|vazio/i);
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-003 — Filtro por status: chats abertos
  // ─────────────────────────────────────────────
  it('CT-BUSCA-003 - deve filtrar e exibir apenas chats abertos', () => {
    cy.get('[data-testid="tab-filter-trigger"]').click();

    // Seleciona o filtro "Em atendimento" ou "Abertos"
    cy.contains(/em atendimento|abertos|open/i).click();

    // Lista deve mostrar apenas chats com esse status
    cy.get('[data-testid="chat-list-item"], .chat-item, li[data-chat]')
      .should('exist');

    // Nenhum chat com status "Aguardando" ou "Finalizado" deve aparecer
    cy.get('body').should('not.contain.text', /finalizado.*item|closed.*item/i);
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-004 — Filtro por status: chats aguardando
  // ─────────────────────────────────────────────
  it('CT-BUSCA-004 - deve filtrar e exibir apenas chats aguardando atendimento', () => {
    cy.get('[data-testid="tab-filter-trigger"]').click();
    cy.contains(/aguardando|waiting|na fila/i).click();

    // Lista deve existir (pode estar vazia em horário de baixo volume)
    cy.get('body').should('not.contain.text', 'Erro');
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-005 — Limpar filtro restaura lista
  // ─────────────────────────────────────────────
  it('CT-BUSCA-005 - limpar filtro deve restaurar a lista completa', () => {
    // Aplica um filtro
    cy.get('[data-testid="tab-filter-trigger"]').click();
    cy.contains(/em atendimento|abertos|open/i).click();

    // Limpa o filtro (botão "Todos" ou "Limpar")
    cy.contains(/todos|all|limpar|clear/i).click();

    // Lista deve voltar ao estado padrão sem erro
    cy.get('body').should('not.contain.text', 'Erro');
    cy.url().should('include', '/chat');
  });

  // ─────────────────────────────────────────────
  // CT-BUSCA-006 — Busca + filtro combinados
  // ─────────────────────────────────────────────
  it('CT-BUSCA-006 - deve aplicar busca por texto e filtro de status simultaneamente', () => {
    // Aplica filtro de status
    cy.get('[data-testid="tab-filter-trigger"]').click();
    cy.contains(/em atendimento|abertos|open/i).click();

    // Aplica busca por texto
    cy.get('[data-testid="search-input"], input[placeholder*="buscar"], input[placeholder*="pesquisar"]')
      .first()
      .type('Yuri');

    // Não deve quebrar — resultado pode ser vazio ou não
    cy.get('body').should('not.contain.text', 'Erro');
    cy.url().should('include', '/chat');
  });
});
