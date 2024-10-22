let getAuthToken = localStorage.getItem('token');
let token = null;

if (getAuthToken) {
  const sanitizedToken = getAuthToken.replace(/['"]+/g, '');
  token = sanitizedToken;
} else {
  console.error("Token bulunamadı. Giriş yapmış olmayabilirsiniz.");
}

export default token;