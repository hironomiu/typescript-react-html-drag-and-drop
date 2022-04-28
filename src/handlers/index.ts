import { rest } from 'msw'

export const handlers = [
  // [MSW] Warning: captured a request without a matching request handler:
  rest.post('http://localhost:8888/api/v1/csrf-token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        csrfToken: 'csrfToken',
      })
    )
  }),
  // [MSW] Warning: captured a request without a matching request handler:
  rest.post('http://localhost:8888/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: true,
      })
    )
  }),
  rest.get('http://localhost:8888/api/v1/boards', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isSuccess: true,
        boards: [
          { id: 1, title: 'todo' },
          { id: 2, title: 'doing' },
          { id: 3, title: 'done' },
        ],
      })
    )
  }),
  rest.get('http://localhost:8888/api/v1/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          user_id: 1,
          title: 'dummy title 1',
          body: 'dummy body 1',
          board_id: 1,
          order_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          title: 'dummy title 2',
          body: 'dummy body 2',
          board_id: 1,
          order_id: 2,
        },
        {
          id: 3,
          user_id: 1,
          title: 'dummy title 3',
          body: 'dummy body 3',
          board_id: 1,
          order_id: 3,
        },
      ])
    )
  }),
]
