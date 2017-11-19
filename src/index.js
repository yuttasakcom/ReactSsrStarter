import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.get('*', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})