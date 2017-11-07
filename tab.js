(function ($) {
  var Tab = function (params) {
    var _this_ = this
    this.tab = params //this就是Tab函数
    this.config = {
      triggerType: "mouseenter",
      effect: "default",
      invoke: "1",
      auto: "none"
    }
    this.Navitem = this.tab.find('ul.nav-wrap li.nav-item')
    this.ContentItem = this.tab.find('div.content div.content-item')
    this.getConfig()

    if (this.getConfig()) {
      $.extend(this.config, this.getConfig())
    }

    //保存配置參數
    var config = this.config
    
    if (config.triggerType) {
      this.Navitem.on(config.triggerType, function () {
        _this_.invoke($(this))
      })
    }

    //自动轮播
    if (config.auto === 'none') {
      return
    }else{
      this.timer = null
      _this_.autoPlay()
      this.loop = 0
      this.tab.hover(function() {
        clearInterval(_this_.timer)
      },function() {
        _this_.autoPlay()        
      })
    }
    //invoke
    if (config.invoke>1) {
      this.invoke(this.Navitem.eq(config.invoke - 1))
    }
  }
  Tab.prototype = {
    getConfig: function () {
      //this就是Tab函数
      var config = this.tab.attr('data-config')
      if (config && config !== '') {
        return $.parseJSON(config)
      }else{
        return null
      }
    },
    //setInterval函数里面的this指向window
    //所以需要在property函数里面重新赋值一下this
    invoke: function(currentTab) {
      var _this_ = this
      var index = currentTab.index()
      if (this.config.effect === 'fade') {
        currentTab.addClass('active').siblings().removeClass('active')
        this.ContentItem.eq(index).fadeIn().siblings().fadeOut()
      }else{
        currentTab.addClass('active').siblings().removeClass('active')
        this.ContentItem.eq(index).addClass('actived').siblings().removeClass('actived')
      }
      if (this.config.auto !== 'none') {
        this.loop = index
      }
    },
    autoPlay: function() {
      var _this_ = this
      var Navitem = this.Navitem
      var length = Navitem.length
      var config = this.config
      this.timer = setInterval(function() {
        Navitem.eq(_this_.loop).trigger(config.triggerType)
        _this_.loop += 1
        if (_this_.loop >= length) {
          _this_.loop = 0
        }
      }, config.auto)
    }
  }
  //当前的this是window
  window.Tab = Tab

})(jQuery)