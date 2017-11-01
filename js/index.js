//Info about using the Wiki API:
//https://www.mediawiki.org/wiki/API:Main_page
//https://en.wikipedia.org/w/api.php
//https://www.mediawiki.org/wiki/API:Opensearch

var getArticles = function(searchInput) {
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  $.getJSON(url + searchInput + "&limit=20&namespace=0&format=json&callback=?", function(data) {
    console.log(data);
    if (jQuery.isEmptyObject(data[1]) === true) {
       document.getElementById("txt-no-result").style.display = "block";
    } else {
      for (i = 0; i < data[1].length; i++) {
        $("#articles").append("<div class=\"article" + i + " article\"></div>");
        $(".article" + i).css('opacity', 0);
        $(".article" + i).delay(100 * i).animate({opacity: 1, left: "+=30px"});
        $(".article" + i).append("<div class=\"article-title\">" + data[1][i] + "</div>");
        $(".article" + i).append("<div class=\"article-text\">" + data[2][i] + "</div>");
        $(".article" + i).append("<a class=\"article-link\" href=\"" + data[3][i] + "\" target=\"_blank\"></a>");
      }
    }
  });
};

var startSearch = function() {
  $(".article").remove();
  document.getElementById("txt-no-result").style.display = "none";
  userInput = $("#input-search").val();
  getArticles(userInput);
};

$("#btn-search").on("click", function() {
  startSearch();
});

$("#input-search").keydown(function(e) {
 if (e.which === 13) {
    startSearch();
  }
});