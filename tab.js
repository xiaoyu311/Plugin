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
    
    if (config.triggerType === 'click') {
      this.Navitem.bind(config.triggerType, function () {
        _this_.invoke($(this))
        clearInterval(_this_.timer)
      })
      // this.Navitem.mouseleave(function() {
      //   this.autoPlay()
      // })
    }else{
      this.Navitem.mouseenter(function() {
        _this_.invoke($(this))
        clearInterval(_this_.timer)
      })
      // this.Navitem.mouseleave(function () {
      //   this.autoPlay()
      // })
    }

    //自动轮播
    if (config.auto === 'none') {
      return
    }else{
      this.autoPlay()
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
    },
    autoPlay: function() {
      var Navitem = this.Navitem
      var length = Navitem.length
      var loop = 0
      var config = this.config
      console.log(config)
      this.timer = setInterval(function() {
        Navitem.eq(loop).trigger(config.triggerType)
        loop += 1
        console.log(loop)
        // if (loop >= length) {
        //   console.log(1)
        //   loop = 0
        // }
        // console.log(loop)
      }, config.auto)
    }
  }
  //当前的this是window
  window.Tab = Tab

})(jQuery)