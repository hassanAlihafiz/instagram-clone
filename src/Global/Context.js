import React, { createContext, useEffect, useState } from "react";
import { auth, storage, db } from "../config/Firebase";
import firebase from "firebase";
export const ContextProvider = createContext();
const Context = (props) => {
  const [model, setModel] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [posts, setPost] = useState([]);
  const openModel = () => {
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const registerUser = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({ displayName: username });
      setModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      // res.user.updateProfile({ displayName: username });
      setModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  //Check User
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoader(false);
    });
    //fetch post from firebase
    db.collection("posts")
      .orderBy("currentTime", "desc")
      .onSnapshot((data) => {
        setPost(
          data.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            images: doc.data().image,
            username: doc.data().username,
          }))
        );
      });
  }, [user, loader]);

  const publishComment = (data) => {
    const { id, comment } = data;
    db.collection("posts").doc(id).collection("comments").add({
      comment: comment,
      username: user.displayName,
      currentTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const logoutUser = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const create = (data) => {
    const { title, image } = data;
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snp) => {
        let progress = (snp.bytesTransferred / snp.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        //success function/complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              title,
              image: url,
              username: user.displayName,
              currentTime: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );
  };
  return (
    <ContextProvider.Provider
      value={{
        model,
        openModel,
        closeModel,
        registerUser,
        loginUser,
        user,
        loader,
        logoutUser,
        create,
        posts,
        publishComment,
      }}
    >
      {props.children}
    </ContextProvider.Provider>
  );
};
export default Context;
