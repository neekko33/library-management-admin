import Cookies from 'js-cookie'

const UserId = 'userId'
const UserName = 'username'
const UserType = 'userType'

export function setUserInfo(id, name, type) {
  Cookies.set(UserId, id, { expires: 3 })
  Cookies.set(UserName, name, { expires: 3 })
  Cookies.set(UserType, type, { expires: 3 })
}

export function removeUserInfo() {
  Cookies.remove(UserId)
  Cookies.remove(UserName)
  Cookies.remove(UserType)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function getUserType() {
  return Cookies.get(UserType)
}

const LoginKey = 'hasLogin'
const Token = 'token'
// const UserType = "userType";
export function getToken() {
  return Cookies.get(Token)
}

export function checkLogin() {
  return Cookies.get(LoginKey) === '1'
}

// export function getUserType() {
//   return Cookies.get(UserType);
// }

export function setToken(token, type) {
  Cookies.set(Token, token, { expires: 7 })
  // Cookies.set(UserType, type, { expires: 7 });
  return Cookies.set(LoginKey, '1', { expires: 7 })
}

export function removeToken() {
  Cookies.remove(Token)
  // Cookies.remove(UserType);
  return Cookies.remove(LoginKey)
}
