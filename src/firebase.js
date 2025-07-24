import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./config.json";

const firebaseApp = initializeApp(config.firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth }; 