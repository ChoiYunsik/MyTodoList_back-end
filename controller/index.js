const index = (req, res) => {
    res.set({"Content-Type" : "text/html; charset=utf-8"})
    res.end("<h1>Welcome Express!! v2😊</h1>")
}

export { index };