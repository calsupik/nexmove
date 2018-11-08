export default async function Logout(req, res) {
  req.session.destroy()
  res.redirect('/')
}
