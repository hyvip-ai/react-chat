import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./Pages/ChatRoom";
import Login from "./Pages/Login";
import { auth, firestore } from "./firebase_config/firebase";
import Loader from "./components/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import GroupChat from "./Pages/GroupChat";
function App() {
  const [authenticated, loading] = useAuthState(auth);
  useEffect(() => {
    if (authenticated) {
      let myObj = {
        uid: authenticated.uid,
        photoURL: authenticated.photoURL,
        displayName: authenticated.displayName,
        email: authenticated.email,
      };
      firestore
        .collection("Users")
        .doc(authenticated.uid)
        .set(myObj, { merge: true });
    }
    localStorage.setItem("myUid", authenticated?.uid);
  }, [authenticated]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Loader />
              ) : authenticated ? (
                <ChatRoom authenticated={authenticated} />
              ) : (
                <Login />
              )
            }
          />
          <Route path="/chat/:uid" element={<Chat authenticated={authenticated} />} />
          <Route path="/room/:roomId" element={<GroupChat authenticated={authenticated}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
