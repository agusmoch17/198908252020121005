var ncontentLive = (function() {
    var ctrls = {};
    var state = "off";
    var timerRoutine = null;

    var init = function() {
        ctrls = bindControls();
        bindFunctions();

        events.on("sidangStart", start);
        events.on("sidangStop", stop);
    };

    var bindControls = function() {
        var ctrls = {};

        ctrls.contentLive = $(".ncontent-live");
        ctrls.container = ctrls.contentLive.find(".ncontent-live__container");
        ctrls.statusButton = $(".live-status__status");
        ctrls.noperkara = $(".live-no-perkara__no");
        ctrls.agenda = $(".ncontent-live__agenda");
        ctrls.ruangan = $(".ncontent-live__room");
        ctrls.idSidang = ctrls.contentLive.find("#id-sidang");
        ctrls.liveTime = ctrls.contentLive.find(".live-time");
        ctrls.allItems = ctrls.contentLive.find('.live-ruangan__button');
        ctrls.shareButton = ctrls.contentLive.find('.share-button__live');

        return ctrls;
    };

    var bindFunctions = function() {
        ctrls.statusButton.on('click', statusButtonClick);
        ctrls.allItems.each(function(index, item){
            var jItem = $(item);
            jItem.on('click', ruanganButtonClicked);
        });
        ctrls.shareButton.on('click', shareButtonClick);
    };

    function start(object) {
        if (object.id_ruangan){
            var ruanganButton = ctrls.contentLive.find(".live-ruangan__button[data-id="+ object.id_ruangan +"]");
            ruanganButtonActivate(ruanganButton);
        }

        services.getSidang("", getCurrentRuangan(), 2, function(data){
            $.LoadingOverlay("hide");
            var jsonParsed = JSON.parse(data);
            var sidang = jsonParsed.sidang;
            
            if (sidang){
                setLiveSidang(sidang[0]);
            }else{
                liveContainer.hide();
            }
        });
    }

    function setLiveSidang (sidang){
        var liveContainer = ctrls.container;

        if (sidang){
            ctrls.liveTime.html('loading..');

            ctrls.noperkara.html(sidang.no_perkara);
            ctrls.agenda.html(sidang.agenda);
            ctrls.ruangan.html(sidang.tergugat);
            ctrls.idSidang.val(sidang.id);

            liveContainer.show();

            liveContainer.height("auto");
            var height = liveContainer.height();
            liveContainer.height("0px");

            liveContainer.animate({
                height: height
            }, 500);

            $('html, body').animate({
                scrollTop: "0px"
            }, 1000);

            state = "live";

            var start = moment.utc(sidang.mulai);
            var now = moment();
            var diff = now.diff(start);
            var f = moment.utc(diff).format("HH:mm:ss");
            let interval = 1000;

            if (timerRoutine){
                clearInterval(timerRoutine);
            }

            timerRoutine = setInterval(function(){
                now = moment();
                diff = now.diff(start);
                f = moment.utc(diff).format("HH:mm:ss");
                ctrls.liveTime.html(f);
            }, interval);
        } else {
            liveContainer.hide();
        }
    }

    function stop(object) {
        if (object.id_ruangan){
            var ruanganButton = ctrls.contentLive.find(".live-ruangan__button[data-id="+ object.id_ruangan +"]");
            ruanganButtonActivate(ruanganButton);
        }
        
        //hapus rutin timer
        if (timerRoutine){
            clearInterval(timerRoutine);
        }
        
        var liveContainer = ctrls.container;

        liveContainer.animate({
            height: "0px"
        }, 500, function() {
            liveContainer.hide();
        });

        state = "off";
    }

    var shareButtonClick = function(event){
        event.preventDefault();
        var idSidang = $(this).parent().parent().parent().find("#id-sidang").val();
        services.sendToWA(idSidang);
        // window.open('https://wa.me/6281233805275?text=Saya%20tertarik%20dengan%20mobil%20Anda%20yang%20dijual', '_blank').focus();
    };

    var statusButtonClick = function(event) {
        event.preventDefault();
        if (id_sebagai != 8){
            return;
        }

        var self = $(this);
        var currentStatus = self.attr("status");

        if (currentStatus == 4) {
            return;
        }

        events.emit("statusSidangChoosing", currentStatus);
        events.on("statusSidangChoosed", setStatus);
    };

    function setStatus(data) {
        events.off("statusSidangChoosed", setStatus);

        if (data.status == 4) {
            $.LoadingOverlay("show");
            services.updateSidang (ctrls.idSidang.val(), 4, function(data){
                $.LoadingOverlay("hide");
                events.emit("sidangStop", {
                    idSidang: ctrls.idSidang.val()
                });
            });
        }
    }

    var getCurrentRuangan = function (){
        var currentRuangan = ctrls.contentLive.find(".live-ruangan__button.live-ruangan__button--active").attr('data-id');
        return currentRuangan;
    }

    var ruanganButtonClicked = function(event){
        let self = $(this);
        ruanganButtonActivate(self);
    }

    var ruanganButtonActivate = function (ruanganButton){
        let activeClass = 'live-ruangan__button--active';
        let isActive = ruanganButton.hasClass(activeClass);
        let idRuangan = ruanganButton.attr('data-id');

        events.emit("ruanganButtonChoosed", idRuangan);
  
        if (isActive){
            return;
        } else {
            var prevFilterButton = ctrls.contentLive.find("." + activeClass);

            if (prevFilterButton){
                prevFilterButton.removeClass(activeClass);
            }
            ruanganButton.addClass (activeClass);
            
            services.getSidang("", idRuangan, 2, function(data){
                var jsonParsed = JSON.parse(data);
                var sidang = jsonParsed.sidang;
                if (sidang){
                    setLiveSidang(sidang[0]);
                } else {
                    liveContainer.hide();
                }
                
            });
        }
    }

    var getCurrentSidangId = function (){
        return ctrls.idSidang.val();
    }

    return {
        init: init,
        getCurrentRuangan : getCurrentRuangan,
        getCurrentSidangId : getCurrentSidangId
    };
}());