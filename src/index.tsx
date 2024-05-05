import {Hono} from 'hono'
import {renderToString} from "react-dom/server"
import {D1Database} from "@cloudflare/workers-types"
import {drizzle} from "drizzle-orm/d1";
import {apples} from "./schema/apples";
import {eq, sql} from "drizzle-orm";
import {colors} from "./schema/colors";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{Bindings: Bindings}>()

const appleRoute = app.get('/api/apples', async (c) => {
  const db = drizzle(c.env.DB)

  const results = await db.select({
    name: apples.name,
    // workaround
    // https://github.com/drizzle-team/drizzle-orm/issues/555
    // color: colors.name,
    color: sql`${colors.name}`.as('colorName'),
    quantity: apples.quantity,
  }).from(apples).innerJoin(colors, eq(apples.colorId, colors.id)).all()

  console.log(results)

  const labels = results.map(r => r.name) ?? []
  // テーブルから値を取得していることを分かりやすくするため、テーブルの値 + 1 を設定
  const quantities = results.map(r => r.quantity ? r.quantity + 1 : 0) ?? []
  const colorNames = results.map(r => r.color) ?? []

  return c.json({
    labels: labels,
    datasets: [
      {
        label: '購入数',
        data: quantities,
        backgroundColor: colorNames,
        borderColor: colorNames,
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