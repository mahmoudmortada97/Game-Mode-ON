import { Detail } from "./details.module.js";
import { Game } from "./games.module.js";

export class UI {
  constructor() {}

  async showGames(cat) {
    await this.showLoader("#games");
    const game = new Game();
    const gameData = await game.getGames(cat);
    $("#cardGames").html(""); // clear cardGames section
    await this.hideLoader("#games");

    // Display All Games
    for (const iterator of gameData) {
      $("#cardGames").append(`  <div class="col-xl-3 col-lg-4 col-md-6">
    <div class="card" id=${iterator.id}>
      <img
        src="${iterator.thumbnail}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div
          class="card-title d-flex justify-content-between align-items-center"
        >
          <h5 class="card-title">${iterator.title}</h5>
          <span class="badge text-bg-primary">Free</span>
        </div>
  
        <p class="card-text ">
          ${iterator.short_description}
        </p>
  
        <div
          class="card-info d-flex justify-content-between align-items-center py-2"
        >
          <span class="badge text-bg-danger">${iterator.genre}</span>
          <span class="badge text-bg-success">${iterator.platform}</span>
        </div>
      </div>
    </div>
  </div>`);
    }

    $(".card").click(async (e) => {
      this.showDetails(e);
    });
  }

  async showDetails(e) {
    const gameId = $(e.target).offsetParent().attr("id");
    const detail = new Detail();
    const gameDetail = await detail.getDetails(gameId);

    (function () {
      $("#details #detailsImage").attr("src", gameDetail.thumbnail);
      $("#details h2").html(gameDetail.title);
      $("#details #category").html(gameDetail.genre);
      $("#details #platform").html(gameDetail.platform);
      $("#details #status").html(gameDetail.status);
      $("#details #detailsOfGame").html(gameDetail.description);
      $("#details #link")
        .attr("href", gameDetail.game_url)
        .attr("target", "_blank");
    })();

    $("#games").fadeOut(500, function () {
      $("#details").fadeIn(500);
    });
    $("#closeBtn").click(function () {
      $("#details").fadeOut(500, function () {
        $("#games").fadeIn(500);
      });
    });
  }

  async showLoader(section) {
    $("#loader").fadeIn(1000, function () {
      $("body").css("overflow", "hidden");
      $(`${section}`).fadeOut(1000);
    });
  }

  async hideLoader(section) {
    $(document).ready(function () {
      $("#loader").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
        $(`${section}`).fadeIn(1000);
      });
    });
  }
}

const ui = new UI();
ui.showGames("MMORPG");
$(".nav-item").click((element) => {
  $("body").css("overflow", "hidden");
  let cat = $(element.target).html();
  ui.showGames(cat);
  $(".nav-link").removeClass("active").css({ "font-weight": "400" });
  $(element.target).addClass("active").css({ "font-weight": "600" });
});
