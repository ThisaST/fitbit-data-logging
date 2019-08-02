export const saveTokenToLocalStorage = (accessToken : any) => {
  try {
    localStorage.setItem('accessToken' , JSON.stringify(accessToken))
  } catch (error) {
    return false;
  }
}
export const getAccessToken = () => {
  try {
    const token : any = JSON.parse(localStorage.getItem('accessToken') || '')
    return token.access_token
  } catch (error) {
    return null
  }
}
export const clearLocalStorage = () => {
  localStorage.clear()
}