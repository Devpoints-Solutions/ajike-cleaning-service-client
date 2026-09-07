import { db } from "./firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore/lite";

/**
 * generate a unique key to store users access token
 */
const generateDataKey = () => {
  const id = "auth" + Math.floor(Math.random() * 10000);
  localStorage.setItem("id", id);

  return id;
};

/**
 * store user access token on firestore
 */
export const storeToken = async (token: string) => {
  try {
    const id = generateDataKey();

    await setDoc(doc(db, "authData", id), { token });

    localStorage.setItem("id", id);
  } catch (error) {
    console.log(error);
  }
};

/**
 * get a token from the firestore
 */
export const getToken = async () => {
  try {
    const id = localStorage.getItem("id");

    if (id) {
      const docRef = doc(db, "authData", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data()["token"];
      }
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * delete token from the firestore
 */
export const deleteToken = async () => {
  try {
    const id = localStorage.getItem("id");

    if (id) {
      const docRef = doc(db, "authData", id);
      await deleteDoc(docRef);

      localStorage.removeItem("id");
    }
  } catch (error) {
    console.error(error);
  }
};

export function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie string begins with the name we want
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null; // Return null if the cookie doesn't exist
}
