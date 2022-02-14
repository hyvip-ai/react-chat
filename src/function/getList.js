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
  return chats.users.includes(uid) && chats.users.includes(recipientId)?true:false
}

export { getUpdatedList, chatExist, getRequiredDocument };
