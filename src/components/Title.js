Crafty.c('Title', {
    required: '2D, DOM, Text',
    title: function(data) {
      if (data.text) this.text(data.text);
      if (data.textSize) this.textFont({ size: data.textSize + 'px' });
      if (data.y) this.y = data.y;
      return this;
    },
    init: function() {
      this.w = gameWidth;
      this.x = 0;
      this.css({
          'text-align': 'center'
      })
      this.textColor(themes['interfaceMain']);
    }
});