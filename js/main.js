var nav_offset;

$(function () {

  $(".me_container:odd").addClass("rev");

  var nav = $('#nav');
  var nav_container = $("#nav_container");
  nav.affix({
    offset: {
      top: function () {
        return nav_container.offset().top;
      }
    }
  });

  $("#myScrollspy a[href^='#'], .next_pg").on('click', function (e) {
    this.blur();
    e.preventDefault();

    var hash = this.hash;
    var displacement;
    var self = $(this);
    if (self.hasClass("next_pg"))
      displacement = 1;
    else {

      var nav = $("#nav");
      var nav_items = nav.find("li");
      var active_nav_item_pos = nav_items.index(nav.find("li.active")) || 0;
      var cur_nav_item_pos = nav_items.index(self.closest("li"));
      displacement = Math.abs(active_nav_item_pos - cur_nav_item_pos)
    }
    if ("#top_screen" == self.attr("href")) {
      displacement++;
    }
    displacement++;
    $('html, body').stop(true, true).animate({
      scrollTop: $(hash).offset().top
    }, 500 * displacement, function () {
      window.location.hash = hash;
    });
  });

  $(".me").append($("<div/>").addClass("left_hand"))
    .append($("<div>").addClass("right_hand"))
    .append($("<div>").addClass("left_foot"))
    .append($("<div>").addClass("right_foot"))
    .append($("<div>").addClass("hair"))


  $("#myScrollspy").on('affix.bs.affix', function () {

  });
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });

  var up_icon = $("<div>").addClass("prev_category glyphicon glyphicon-chevron-up pull-left up_down_btn visible-xs");
  var down_icon = $("<div>").addClass("next_category glyphicon glyphicon-chevron-down pull-right up_down_btn visible-xs");
  $(".header_title").addClass("text-center").append(up_icon).append(down_icon).find("h1").addClass("dib");
  $(".header_title:last .next_category").remove();

  $(".prev_category, .next_category").on("click", function () {
    var nav = $("#nav");
    var nav_items = nav.find("li");
    var active_nav_item_pos = nav_items.index(nav.find("li.active")) || 0;
    var new_nav_item_pos = active_nav_item_pos - ($(this).hasClass("next_category") ? -1 : 1);
    var item_to_click = $(nav_items.get(new_nav_item_pos)).find("a");
    if (!item_to_click.hasClass("prev_category"))
      item_to_click.click();
  });
  var last_page_top = 0;

  function is_visible_on_screen(elem, padding_percentage, visible_class, page_top, page_bottom) {
    // page top and page bottom is optional for better performance
    var win = $(window);
    page_top = page_top || win.scrollTop();
    page_bottom = page_bottom || page_top + win.height();

    var elem_top = elem.offset().top;
    var top_gap = parseInt(elem.css("padding-top")) + parseInt(elem.css("border-top"));
    var bottom_gap = parseInt(elem.css("padding-top")) + parseInt(elem.css("border-top"));
    var elem_height = elem.height() + top_gap + bottom_gap;
    var elem_bottom = elem_top + elem_height;

    var padding_height = $(window).height() * padding_percentage;
    var elem_transformed_top = elem_top + padding_height;
    var elem_transformed_bottom = elem_bottom - padding_height;
    if (
      page_top < elem_transformed_top && elem_transformed_top < page_bottom // top overlap
      || page_top < elem_transformed_bottom && elem_transformed_bottom < page_bottom // bottom overlap
    ) {
      if (!elem.hasClass(visible_class))
        elem.addClass(visible_class);
    }
    if (elem_bottom < page_top && elem.hasClass(visible_class)) {
      elem.removeClass(visible_class)
    }
    if (elem_top > page_bottom && elem.hasClass(visible_class)) {
      elem.removeClass(visible_class)
    }
    last_page_top = page_top;
  }

  var last_triggered = new Date();
  var check_interval = 120;

  function trigger_visible_effect() {
    var cur_time = new Date();
    if (cur_time - last_triggered < check_interval) {
      return null;
    }

    // check visible
    var page_top = $(window).scrollTop();
    var page_bottom = page_top + $(window).height();
    $(".category_container").each(function (idx, elem) {
      is_visible_on_screen($(elem), 0.15, "category_visible", page_top, page_bottom);
    });
    last_triggered = new Date();
  }
  $(window).scroll(function () { setTimeout(trigger_visible_effect, check_interval) });

  $(window).on('resize', function (e) {
    trigger_visible_effect();
    nav_offset = nav_container.offset().top;
  });
  trigger_visible_effect();
});

