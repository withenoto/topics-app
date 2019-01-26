document.addEventListener(
  "DOMContentLoaded",
  () => {
    // hide and show new-topics-field
    $(".topicfield").hide();

    $(".toggle").on("click", function() {
      $(".topicfield").toggle();
    });

    $(".upvote").on("click", function() {
      axios
        .post(`/${$(this).attr("data-topic-id")}/upvote`)
        .then(() => { 


          axios.get("/gettopics").then(topics => {

            topics.data
          })
          
          
         // var x = $(`[search-id=${$(this).attr("data-topic-id")}]`)
         // console.log(x.html())

        });

    });

  },
  false
);
