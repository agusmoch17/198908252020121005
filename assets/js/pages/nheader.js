var nheader = (function() {
    var ctrls = {};
    var liveStripStatus;
    var timerRoutine = null;

    var init = function() {
        ctrls = bindControls();
        bindFunctions();

        events.on("sidangStart", start);
        events.on("sidangStop", stop);

        ctrls.liveStrip.hide();
    };

    var bindControls = function() {
        var ctrls = {};

        ctrls.content = $(".nheader");
        ctrls.liveStrip = $(".live-strip");
        ctrls.noperkara = $(".live-strip__no-perkara");
        ctrls.window = $(window);

        return ctrls;
    };

    var bindFunctions = function() {
        ctrls.window.on('scroll', windowOnScroll);
        events.on("ruanganButtonChoosed", ruanganButtonActivate);
    };

    function start(object) {
        var currentRuangan = ncontentLive.getCurrentRuangan();
        services.getSidang("", currentRuangan, 2, function(data){
            $.LoadingOverlay("hide");
            var jsonParsed = JSON.parse(data);
            var sidang = jsonParsed.sidang;
            
            if (sidang.length > 0){
                ctrls.noperkara.html(sidang[0].no_perkara);
                ctrls.liveStrip.show();
            }else{
                ctrls.liveStrip.hide();
            }
        });
    }

    function stop(object) {
        if (!object.previouslyLive) {
            ctrls.liveStrip.hide();
        }
    }

    function ruanganButtonActivate (idruangan){
        services.getSidang("", idruangan, 2, function(data){
            $.LoadingOverlay("hide");
            var jsonParsed = JSON.parse(data);
            var sidang = jsonParsed.sidang;
            
            if (sidang.length > 0){
                ctrls.noperkara.html(sidang[0].no_perkara);
                ctrls.liveStrip.show();
            }else{
                ctrls.liveStrip.hide();
            }
        });
    }

    function windowOnScroll() {
        var scrollposition = ctrls.window.scrollTop();

        if (scrollposition >= 140) {
            nheaderLiveStripSetter("show");
        } else {
            nheaderLiveStripSetter("hide");
        }
    }

    function nheaderLiveStripSetter(status) {
        if (status == liveStripStatus) {
            return;
        }
        if (status == "show") {
            ctrls.liveStrip.animate({
                marginTop: "0px"
            }, 200, function() {

            });
        } else if (status == "hide") {
            ctrls.liveStrip.animate({
                marginTop: "-50px"
            }, 200);
        }
        liveStripStatus = status;
    }

    return {
        init: init,
        height: function() {
            return ctrls.content.height();
        }
    }
}());