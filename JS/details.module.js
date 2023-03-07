///  <reference types="../@types/jquery"/>
export class Detail {
  constructor() {}
  async getDetails(gameId) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "23bd5709bcmsh18da5f7b0e90983p1f99e4jsn2695fe8248b8",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
      options
    );
    const response = await api.json();
    return response;
  }
}
