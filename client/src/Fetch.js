
export default async function Fetch (url, loader, fetchProps = {}, headers = {}, doJson = true) {
  loader.setLoader(true)
  const token = window.localStorage.getItem('atkn')
  let tokenConfig = {}
  if (token) {
    tokenConfig = {
      'x-auth-token': token
    }
  }
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...tokenConfig,
      ...headers
    },
    ...fetchProps
  })
  loader.setLoader(false)
  if (doJson) {
    const jsonParsed = await data.json()
    return jsonParsed
  }
  return data
}
