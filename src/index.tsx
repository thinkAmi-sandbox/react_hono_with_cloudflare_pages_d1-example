import {Hono} from 'hono'
import {renderToString} from "react-dom/server"

const app = new Hono()

const appleRoute = app.get('/api/apples', (c) => {
  return c.json({
    labels: ['奥州ロマン', 'シナノゴールド', 'ピンクレディ', 'ブラムリー'],
    datasets: [
      {
        label: '購入数',
        data: [1, 5, 3, 2],
        backgroundColor: [
          'firebrick', 'gold', 'pink', 'mediumseagreen'
        ],
        borderColor: [
          'firebrick', 'gold', 'pink', 'mediumseagreen'
        ],
        borderWidth: 1
      }
    ]
  })
})

// フロントエンドと型を共有するため、export type しておく
export type ApplesType = typeof appleRoute

app.get('*', (c) => {
  return c.html(
    renderToString(
      <html>
      <head>
        <meta charSet="utf-8"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <title>React app</title>
        {import.meta.env.PROD ? (
          <>
            <script type="module" src="/static/client.js"></script>
          </>
        ) : (
          <>
            <script type="module" src="/src/client/main.tsx"></script>
          </>
        )}
      </head>
      <body>
      <div id="root"></div>
      </body>
      </html>
    )
  )
})

export default app