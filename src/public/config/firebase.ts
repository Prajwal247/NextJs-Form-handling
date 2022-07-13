const api = {
  host:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/ready-to-work-development/us-central1/api/api"
      : "/api"
};

let firebaseConfig = {
  apiKey: "AIzaSyAd0V39hF3OWYRVeI5FFnlSX4hoNRpIOPg",
  authDomain: "ready-to-work-development.firebaseapp.com",
  databaseURL: "https://ready-to-work-development.firebaseio.com",
  projectId: "ready-to-work-development",
  storageBucket: "ready-to-work-development.appspot.com",
  messagingSenderId: "627920882832",
  appId: "1:627920882832:web:662dd80f7338a1a6"
};

if (
  process.env.NODE_ENV === "production" &&
  window.location.href.indexOf(".quickjobsjapan.com") !== -1
) {
  firebaseConfig = {
    apiKey: "AIzaSyC1PRfsNWXoJ6LS4XMPgyXU3566kAq3ptY",
    authDomain: "ready-to-work-d1465.firebaseapp.com",
    databaseURL: "https://ready-to-work-d1465.firebaseio.com",
    projectId: "ready-to-work-d1465",
    storageBucket: "ready-to-work-d1465.appspot.com",
    messagingSenderId: "882070407181",
    appId: "1:882070407181:web:55e017a0cfede34b"
  };
}

export { api };
export default firebaseConfig;
