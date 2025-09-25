import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  return (
    <GoogleOAuthProvider clientId="941218531845-vmele0dlu2e80ffoeqh2lmm9jd8bhtnu.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={async credentialResponse => {
          const token = credentialResponse.credential;
          
          // Send token to backend API
          const res = await axios.post("http://localhost:5000/auth/google", { token });
          console.log(res.data); // user info
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
