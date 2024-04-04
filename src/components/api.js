async function getProfileInfo() {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileImageElement = document.querySelector('.profile__image');
  
  return fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
    method: 'GET',
    headers: {
      authorization: '525d9810-1f71-4b0b-b990-61c4da29ce8a'
    }
})
  .then(res => res.json())
  .then((data) => {
    profileTitle.textContent = data.name
    profileDescription.textContent = data.about
    profileImageElement.style.backgroundImage = `url('${data.avatar}')`;
  });
}
getProfileInfo()

export {getProfileInfo}