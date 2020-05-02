import { Application, NotFoundException } from 'https://deno.land/x/abc@v0.2.11/mod.ts'
import { logger } from 'https://deno.land/x/abc@v0.2.11/middleware/logger.ts'
import { join } from 'https://deno.land/std@v0.42.0/path/mod.ts'

const { readFile  } = Deno

const app = new Application()
app.start({ port: 8887, hostname: '0.0.0.0' })
console.log('Server running at http://127.0.0.1:8887/')

app.use(logger()).get('/*files', async (c) => {

  if (c.path === '/') {
    return c.redirect('/home')
  } 

  const f = await readFile(join('.', c.path.slice(1)))
  const code = new TextDecoder().decode(f)

  if (c.path === '/home') {
    return c.html(code)
  } 

  throw new NotFoundException()
})



