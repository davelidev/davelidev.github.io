$(function(){

    var dot_pos = [];
    var canvas = $("#front_page_canvas");
    var context = canvas[0].getContext('2d');


    var refresh_interval = 25;
    var last_updated;

    function clear_canvas() {
        context.clearRect(0, 0, canvas.attr("width"), canvas.attr("height"))
    }

    function resize_canvas() {
        var header = $("header");
        canvas.attr({"width": header.width(), "height": header.height()});
        var scatterness = 60, x_start = -scatterness / 2, y_start = -scatterness / 2,
            x_end = canvas.attr("width"), y_end = canvas.attr("height");
        dot_pos = [];
        for (var x = x_start; x < x_end; x += scatterness) {
            for (var y = y_start; y < y_end; y += scatterness) {
                var x_pos = Math.floor(Math.random() * scatterness) + x;
                var y_pos = Math.floor(Math.random() * scatterness) + y;
                dot_pos.push(new Dot(x_pos, y_pos, 8, 0.1, 150));

            }
        }

        render(true);
    }

    function Dot(x, y, default_size, transparency, radius) {
        this.x = x;
        this.y = y;
        var colors = ["#e9e0d9", "#9b9595", "#19152e", "#312e4d", "#69738d", "#b4b5b7"];
        //var colors = ["rgba(246,227,212,1)", "rgba(255,127,118,1)", "rgba(135,78,110,1)", "rgba(37,53,102,1)",
        //  "rgba(60,101,119,1)", "rgba(208,209,177,1)"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.default_transparency = transparency;
        this.transparency = transparency;
        this.line = null;
        this.default_size = default_size;
        this.size = this.default_size;
        this.radius = radius;
    }

    Dot.prototype.draw_dot = function () {
        context.globalAlpha = this.transparency;
        // context.shadowBlur = 3;
        context.fillStyle = this.color;
        context.shadowColor = context.fillStyle;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    };

    Dot.prototype.draw_line = function () {
        if (!!this.line) {
            context.strokeStyle = this.color.substr(0, this.color.lastIndexOf(",")) + "," +
                ("" + Math.pow(this.line[2], 0.9)).substr(0, 4) + ")";
            console.log(context.strokeStyle);
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.line[0], this.line[1]);
            context.stroke();
        }
    };

    Dot.prototype.set_cur = function (x, y) {
        var dist = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((y - this.y), 2));
        if (dist < this.radius) {

            var scale = Math.pow((this.radius - dist) / this.radius, 0.2);
            this.transparency = scale * (1 - this.default_transparency) * 0.5 + this.default_transparency;
            this.line = [x, y, scale];
            this.size = Math.pow(scale * 1.35, 12) + this.default_size
        }
        else {
            this.transparency = this.default_transparency;
            this.line = null;
            this.size = this.default_size;
        }
    };

    function render(event) {
        var cur_date = new Date();
        if (last_updated && last_updated > cur_date - refresh_interval)
            return;
        last_updated = cur_date;
        if (!event) {
            dot_pos.forEach(function (dot) {
                dot.draw_dot()
            });
        } else {
            clear_canvas();
            for (var i = 0; i < dot_pos.length; i++) {
                var dot = dot_pos[i];
                dot.set_cur(event.pageX - canvas[0].offsetLeft, event.pageY - canvas[0].offsetTop);
                dot.draw_dot()
            }
            //dot_pos.forEach(function (dot) {
            //  dot.draw_line()
            //})
        }
    }

    $("header, .canvas_padding").mousemove(function (event) {
        setTimeout(render(event), refresh_interval);
    });

    var resizeTimer;
    if (!/Mobi/.test(navigator.userAgent))
        $(window).on('resize', function (e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize_canvas, 250);
        });
    resize_canvas();

    $('[data-toggle="tooltip"]').tooltip();
});
