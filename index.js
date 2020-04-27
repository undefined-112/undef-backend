import app from "./src/App"

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
