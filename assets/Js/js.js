$(document).ready(function () {
  let currentSlide = 0;
  let imgW = 770;
  const size = $(".img-W img ").length;
  for (let i = 0; i < size; i++) {
      let dotStr = '<div class="dot ' + (i === currentSlide ? 'active' : '') + '"></div>';
      $("#dots-container").append(dotStr);
  }
  const showSlide = (index, direction) => {
      $(".img-W img:not(.active)").hide();
      $(".img-W").css('left', 0);
      let leftPos = 0;
      if (direction) {
          leftPos = -1 * imgW;
          if (index > currentSlide) {
              for (let j = currentSlide + 1; j <= index; j++)
                  $(".img-W").append($(".img-W img[alt=img" + j + "]").show())
              leftPos = (currentSlide - index) * imgW;
          }
          else $(".img-W").append($(".img-W img[alt=img" + index + "]").show())
      } else {
          let noSteps = 1;
          if (index < currentSlide) {
              for (let j = currentSlide - 1; j >= index; j--)
                  $(".img-W").prepend($(".img-W img[alt=img" + j + "]").show())
              noSteps = currentSlide - index;
          } else $(".img-W").prepend($(".img-W img[alt=img" + index + "]").show())

          $(".img-W").css('left', `${-(noSteps * imgW)}px`)
      }
      $('.img-W').animate({ left: leftPos }, 1000);
      $(".dot").removeClass("active");
      $(".dot").eq(index).addClass("active");
      $(".img-W img[alt=img" + currentSlide + "]").removeClass('active');
      $(".img-W img[alt=img" + index + "]").addClass('active');
      $("#image-overlay h2").text("IMG " + index);
      currentSlide = index;
  }
  $(".dot").click(function () {
      let newIndex = $('.dot').index(this);
      let direc = (newIndex > currentSlide);
      showSlide(newIndex, direc);
  })
  $("#prev").click(function () {
      const indexChange = currentSlide - 1 < 0 ? $(".img-W img").length - 1 : currentSlide - 1;
      showSlide(indexChange, false);
  });
  $("#next").click(function () {
      const indexChange = currentSlide + 1 > $(".img-W img").length - 1 ? 0 : currentSlide + 1;
      showSlide(indexChange, true);
  });
});
