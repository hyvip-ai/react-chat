function getUpdatedList(authenticated, list) {
  let modified = list.filter((item) => {
    return authenticated.uid !== item.uid;
  });
  return modified;
}

function chatExist(chats, uid, recipientId) {
  let exist = false;
  if (chats?.length) {
    for (let chat of chats) {
      if (chat.users.includes(uid) && chat.users.includes(recipientId)) {
        exist = true;
        break;
      }
    }
  }
  return exist;
}

function getRequiredDocument(chats, uid, recipientId) {
  
  const required = chats.filter(chat=>{
    return chat.users.includes(uid) && chat.users.includes(recipientId)
  })
  return required
}

export { getUpdatedList, chatExist, getRequiredDocument };
