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

async function getCardData() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
      method: 'GET',
      headers: {
        authorization: '525d9810-1f71-4b0b-b990-61c4da29ce8a'
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    return response.json();
  } catch (error) {
    console.error('Ошибка при получении данных карточек:', error);
    return [];
  }
}

export {getProfileInfo, getCardData}