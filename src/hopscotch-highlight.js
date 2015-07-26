(function(){

  hopscotch.highlight = {

    settings: {
      padding: 7
    },

    getStep: function() {
      var stepNo = hopscotch.getCurrStepNum();
      return window.tour.steps[stepNo];
    },

    getTarget: function(step) {
      var target = step.target;
      return $(typeof target === 'string' ? '#' + target : target);
    },

    show: function() {
      var step = hopscotch.highlight.getStep();
      var target = hopscotch.highlight.getTarget(step);

      target.addClass('hopscotch-highlighted');

      hopscotch.highlight.showHighlight(target, step.table);
      hopscotch.highlight.showOverlay();
    },

    remove: function() {
      $('.hopscotch-highlighted').removeClass('hopscotch-highlighted');
      $('#hopscotch-overlay, #hopscotch-highlight').remove();
    },

    showHighlight: function(el, table) {

      hopscotch.highlight.positionHighlight(el, table);

      // Highlight entire table column
      if (typeof table !== 'undefined') {
        // Bring each cell to foreground
        var i = el.index();
        el.closest('table').find('tbody tr').each(function() {
          $(this).find('td').eq(i).addClass('hopscotch-highlighted');
        });
      }
    },

    positionHighlight: function(el, table) {
      var h = $('#hopscotch-highlight');
      var p = hopscotch.highlight.settings.padding;

      h.css({'top': el.offset().top - p, 'left': el.offset().left - p});
      h.css({'width': el.width() + p * 2, 'height': el.height() + p * 2});

      if (typeof table !== 'undefined') {
        // Resize highlight to column height
        h.css('height', el.closest('table').height() + hopscotch.highlight.settings.padding * 2);
      }
    },

    showOverlay: function() {
      $('<div/>').attr('id', 'hopscotch-overlay').appendTo('body');
    }

  };

  window.onresize = function() {
    // reposition highlight
    var step = hopscotch.highlight.getStep();
    var target = hopscotch.highlight.getTarget(step);
    hopscotch.highlight.positionHighlight(target, step.table);
  };

})();