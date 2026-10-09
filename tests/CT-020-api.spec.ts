import { test, expect } from '@playwright/test';

test('CT-020 - Rejeitar 6 unidades do mesmo produto na confirmação do pedido', async ({ request }) => {
  const payload = {
      cliente: {
        nome: 'Maria Silva',
        email: 'maria@exemplo.com',
        cep: '01310-100',
      },
      itens: [
        {
          produtoId: 'P005',
          quantidade: 6,
        },
      ],
  }

  const response = await request.post('/api/pedidos', { data: payload });

  // Validar status HTTP
  expect(response.status()).toBe(422);

  const body = await response.json();

  // Validar código de erro
  expect(body.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');

  // Validar que nenhum número de pedido foi gerado
  expect(body).not.toHaveProperty('numero');
});