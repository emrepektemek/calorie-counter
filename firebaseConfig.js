import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  //your firebase config object properties
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
