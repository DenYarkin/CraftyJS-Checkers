Crafty.c("Button", {
    required: "2D, DOM, Text, Mouse",
    init: function(H = -1, W = -1) {
        this.h = 62
        this.w = 600
        let _x = this.x
        let _y = this.y
        console.log("Button h = " + H)
        if (H != -1) {
            this.h = H
            this.w = W
            // this.x = _x = posX
            // this.y = _y = posY
        }
        this.back = Crafty.e("2D, DOM, Text, Color")
            .attr({
                x: _x,
                y: _y,
                h: this.h,
                w: this.w
            })
            .css({
                "border-radius": "20px",
                "background-color": themes['interfaceBack'],
                "transition-duration": "200ms",
                "transition-property": "background-color"
            })
        this.text = Crafty.e("2D, DOM, Text")
            .attr({
                x: _x,
                y: _y,
                h: this.h,
                w: this.w
            })
            .textFont({
                size: "45px"
            })
            .css({
                "margin-top": "4px",
                "text-align": "center",
                "color": themes['interfaceMain'],
                "transition-duration": "200ms",
                "transition-property": "background-color"
            })
    },
    events: {
        "MouseOver": function() {
            this.back.css({
                "background-color": themes['interfaceMain']
            })
            this.text.css({
                "color": themes['interfaceBack']
            })
        },
        "MouseOut": function() {
            this.back.css({
                "background-color": themes['interfaceBack']
            })
            this.text.css({
                "color": themes['interfaceMain']
            })
        },
    },
    newPos: function(x, y) {
        this.x = x
        this.y = y

        this.back.x = x
        this.back.y = y

        this.text.x = x
        this.text.y = y
    },
    newSize: function(h, w) {
        this.h = h
        this.w = w

        this.back.h = h
        this.back.w = w

        this.text.h = h
        this.text.w = w
    },
    addText: function(text) {
        this.text.text(text)
    }
})