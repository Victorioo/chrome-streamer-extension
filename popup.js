const clientId = "YOUR-CLIENT-ID-HERE";
const accessToken = "YOUR-ACCESS-TOKEN-HERE"; // Here your access token
const streamerName = "YOUR-FAVORITE-STREAMER-HERE"; // Here your favorite Streamer
const streamerStatus = document.getElementById("streamer-status");

const url = `https://api.twitch.tv/helix/streams?user_login=${streamerName}`;

const headers = {
  "Client-ID": clientId,
  Authorization: `Bearer ${accessToken}`,
};

const callPicture = async () => {
  const pictureAPI = await fetch(
    `https://api.twitch.tv/helix/search/channels?query=${streamerName}`,
    { headers }
  );

  const imgTag = document.getElementById("streamer_icon");
  const data = await pictureAPI.json();

  const pictureURL = data.data[0].thumbnail_url;
  imgTag.setAttribute("src", pictureURL);
};

const templateStreamerData = (user, title, category) => {
  return `<section class="section-online">
      <img alt="imagen de ${user}" id="streamer_icon"/>
      <h2 id="streamer-status">${user} está online</h2>
      <span>${category}</span>
      <p>${title}</p>
      <a href="https://www.twitch.tv/${user}">Ver en twitch</a>
    </section>`;
};

const callToAPI = async () => {
  return fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => {
      // Verificar si el streamer está en vivo
      if (data.data && data.data.length < 0) {
        const { user_name, title, game_name, tags } = data.data[0];

        streamerStatus.innerHTML = templateStreamerData(
          user_name,
          title,
          game_name
        );
      } else {
        streamerStatus.innerHTML = `<section class="section-online">
      <h2 id="streamer-status">${streamerName} no está online</h2>
      <a href="https://twitch.tv/${streamerName}">Twitch</a>
    </section>`;
      }
    })
    .catch((error) =>
      console.error("Error al realizar la solicitud a la API de Twitch:", error)
    );
};

callToAPI().then(() => callPicture());
