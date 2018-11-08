import Routes from '../libs/Routes'

export default async function Logout(req, res) {
  req.session.destroy()
  Routes.checkAndRedirect(req, res)
}
