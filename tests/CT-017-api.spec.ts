import { test, expect } from '@playwright/test';

test('CT-017 - Rejeitar pedido com cupom expirado', async ({ request }) => {
  const payload = {
      cliente: {
        nome: 'Maria Silva',
        email: 'maria@exemplo.com',
        cep: '01310-100',
      },
      itens: [
        {
          produtoId: 'P005',
          quantidade: 1,
        },
      ],
      cupom: 'VERAO2026',
  }

  const response = await request.post('/api/pedidos', { data: payload });

  // Validar status HTTP
  expect(response.status()).toBe(422);

  const body = await response.json();

  // Validar código de erro
  expect(body.erro.codigo).toBe('CUPOM_EXPIRADO');

  // Validar que nenhum número de pedido foi gerado
  expect(body).not.toHaveProperty('numero');
});