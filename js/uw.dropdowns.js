// ### UW Dropdowns

// This function creates the UW Dropdowns
// For usage please refer to the [UW Web Components Dropdowns](http://uw.edu/brand/web/#dropdowns)



UW.Dropdowns = Backbone.View.extend({

  index : {
    topmenu : 0,
    submenu : 0
  },

  elements : {
    toplevel : '.dawgdrops-item'
  },

  keys : {
    enter    :   13,
    esc      :   27,
    tab      :   9,
    left     :   37,
    up       :   38,
    right    :   39,
    down     :   40,
    spacebar :   32
  },


  events : {
    'keydown .dawgdrops-menu a' : 'moveFocusInSubMenu',
    'keydown .dawgdrops-item > a' : 'toggleSubMenu'
  },


  initialize : function(options)
  {
    _.bindAll( this, 'toggleSubMenu' )
    this.settings = _.extend( {}, this.defaults , this.$el.data() , options )
    this.$topLevelNav = this.$el.find( this.elements.toplevel )
    this.render()
  },

  render : function()
  {
    _.map( this.$topLevelNav, this.positionSubmenu )
  },

  positionSubmenu : function( el )
  {
    var $el = $(el)
    $el.find('ul').css({ left : $el.position().left })
  },

  toggleSubMenu : function( e )
  {
    switch ( e.keyCode )
    {

      case this.keys.enter :
      case this.keys.down  :

        this.currentSubMenu = $(e.currentTarget).siblings('ul')
        this.currentSubMenuAnchors = this.currentSubMenu.find('a')

        this.currentSubMenu
            .attr( 'aria-expanded', 'true' )
            .show()
          .find('a')
            .eq(0)
            .focus()

        return false

      case this.keys.left :
        $(e.currentTarget).parent().prev().children('a').first().focus()
        return false


      case this.keys.right :
        $(e.currentTarget).parent().next().children('a').first().focus()
        return false

      case this.keys.spacebar:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

    }

  },

  moveFocusInSubMenu : function(e)
  {
    switch ( e.keyCode ) {

      case this.keys.tab:
        if ( this.currentSubMenu )
        {
          this.currentSubMenu.hide()
          this.currentSubMenu = null
          this.index.submenu = 0
        }
        break

      case this.keys.down:
        this.index.submenu = this.index.submenu === this.currentSubMenuAnchors.length-1 ? 0 : this.index.submenu + 1
        this.currentSubMenuAnchors.eq( this.index.submenu ).focus()
        return false

      case this.keys.up :
        this.index.submenu = this.index.submenu === 0 ? this.currentSubMenuAnchors.length-1 : this.index.submenu - 1
        this.currentSubMenuAnchors.eq( this.index.submenu ).focus()
        return false

      case this.keys.left:
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .hide().parent().prev().children('a').first().focus()
        return false;

      case this.keys.right:
        this.currentSubMenu.attr( 'aria-expanded', 'false' )
          .hide().parent().next().children('a').first().focus()
        return false;

      case this.keys.spacebar:
      case this.keys.enter:
        window.location.href = $(e.currentTarget).attr('href')
        return false;

      default:
        var chr = String.fromCharCode(e.which)
        , exists = false;

        this.currentSubMenuAnchors.filter(function() {
          exists = this.innerHTML.charAt(0) === chr
          return exists;
        }).first().focus();

        return !exists;


    }
  }

})