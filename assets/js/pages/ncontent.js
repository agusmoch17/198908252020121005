var ncontent = (function() {
    var ctrls = {};
    var currentStatusButton = null;
    var currentNcontent = null;

    var init = function() {
        setupView(function(){
            ctrls = bindControls();
            bindFunctions();
            initSidangFirstTime();
            // fetchChanges();

            events.on("sidangStop", stop);
        });
    };

    var setupView = function(onComplete){
        services.getSidang ("","","",function(data){
            if (data){
                var jsonParsed = JSON.parse(data);
                var sidang = jsonParsed['sidang'];
                var html = "";
                
                sidang.forEach(function (s, si){
                    var pihak = s.pihak;
                    var isPermohonan = false;
                    if (s.id_alur_perkara=='2' || s.id_alur_perkara=='10' || s.id_alur_perkara=='12' || s.id_alur_perkara=='13' || s.id_alur_perkara=='14' || s.id_alur_perkara=='16' || s.id_alur_perkara=='622'){
                        isPermohonan = true;
                    }

                    html += '<div class="ncontent-queue-item '+ (s.no_perkara.includes("Pdt") ? "perdata" : "pidana") +'">';
                    html += '<input type="text" id="id-sidang" value="'+s.id+'" hidden>';
                    html += '<div class="ncontent-queue-item__container">';
                    html += '<div class="ncontent-queue-item__header">';
                    html += '<div class="ncontent-queue-item__no-perkara queue-no-perkara">';
                    html += '<div class="queue-no-perkara__no">'+s.no_perkara+'</div>';
                    html += '</div>';
                    
                    if (s.id_status_sidang == 0){
                        html += '<div class="ncontent-queue-item__status queue-status">';
                        html += '<div class="queue-status__status status" status="0">Persiapan<span class="material-icons-outlined" style="font-size: 12px;">keyboard_arrow_down</span></div>';
                        html += '</div>';
                    } else if (s.id_status_sidang == 1){
                        html += '<div class="ncontent-queue-item__status queue-status">';
                        html += '<div class="queue-status__status queue-status__status--ready" status="1">Siap Sidang <span class="material-icons-outlined" style="font-size: 12px;">history</span></div>';
                        html += '</div>';
                    } else if (s.id_status_sidang == 2){
                        html += '<div class="ncontent-queue-item__status queue-status">';
                        html += '<div class="queue-status__status queue-status__status--live" status="2">Berlangsung <span class="material-icons-outlined" style="font-size: 12px;">play_circle_filled</span></div>';
                        html += '</div>';
                    } else if (s.id_status_sidang == 3){
                        html += '<div class="ncontent-queue-item__status queue-status">';
                        html += '<div class="queue-status__status queue-status__status--suspend" status="3">Skors <span class="material-icons-outlined" style="font-size: 12px;">done</span></div>';
                        html += '</div>';
                    } else if (s.id_status_sidang == 4){
                        html += '<div class="ncontent-queue-item__status queue-status">';
                        html += '<div class="queue-status__status queue-status__status--done" status="4">Selesai <span class="material-icons-outlined" style="font-size: 12px;">done</span></div>';
                        html += '</div>';
                    }

                    html += '</div>';
                    html += '<h3 class="ncontent-queue-item__agenda">'+s.agenda+'</h3>';
                    if (!isPermohonan){
                        html += '<small class="ncontent-queue-item__room">'+s.tergugat+'</small>';
                    } else {
                        html += '<small class="ncontent-queue-item__room">'+s.pemohon+'</small>';
                    }
                    html += '<div class="ncontent-queue-item__pihak pihak">';

                    pihak.forEach(function(p, pi){
                        html += '<div class="pihak__container">';
                        html += '<input type="text" id="id-sidang-pihak" value="'+p.id+'" hidden>';
                        html += '<div class="pihak__items ' + ((p.id_pihak == id_pihak) || (id_sebagai == 8) ? "pihak__items--owner" : "") + '">';
                        html += '<div class="pihak__item ' + (p.status == 1 ? 'pihak__item--active' : '') + '" id="pihak-'+p.id+'">';
                        html += p.nama.length > 20 ? (p.nama.substring(0, 20) + "..") : p.nama;
                        html += '</div>';
                        html += '<div class="pihak__name">';
                        html += p.sebagai;
                        html += ((p.id_pihak == id_pihak) || (id_sebagai == 8) ? '<span class="material-icons-outlined">keyboard_arrow_down</span>' : "");
                        html += '</div>';
                        html += '</div>';
                        html += '<div class="pihak__options pihak-options">';
                        html += '<div class="pihak-options__container">';
                        html += '<div class="pihak-options__button-label">'+p.nama+'</div>';
                        html += '<div class="pihak-options__buttons option-buttons" belongto="pihak-'+p.id+'">';
                        html += '<div class="option-buttons__button '+ (p.status == 0 ? 'option-buttons__button--active' : '') + '" status="2">Belum Siap</div>';
                        html += '<div class="option-buttons__button '+ (p.status == 1 ? 'option-buttons__button--active' : '') + '" status="1">Siap</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                        html += '</div>';
                    });
                    html += '</div>';
                    html += '<div class="ncontent-queue-item__share share"><div class="share-button"><span class="material-icons-outlined">chat</span></div></div>';
                    html += '</div>';
                    html += '</div>';
                });

                var mom = moment();
                $(".ncontent-queue").append(html);
                $(".date__container h1").html (mom.format("DD"));
                $(".date__container small").html ((mom.format("MMM")).toUpperCase());

                if (onComplete){
                    onComplete();
                }
            }else{
                window.alert("No Data");
            }
        });
    }

    var bindControls = function() {
        var ctrls = {};
        ctrls.content = $(".ncontent");
        ctrls.statusButton = $(".queue-status__status");
        ctrls.contentQueue = ctrls.statusButton.closest(".ncontent-queue-item");
        ctrls.container = ctrls.contentQueue.find(".ncontent-queue-item__container");
        ctrls.noperkara = ctrls.contentQueue.find(".queue-no-perkara__no");
        ctrls.allFilter = $(".all-filter-button");
        ctrls.pidanaFilter = $(".pidana-filter-button");
        ctrls.perdataFilter = $(".perdata-filter-button");
        ctrls.doneFilter = $(".selesai-filter-button");
        ctrls.allItems = ctrls.content.find('.ncontent-queue-item');
        ctrls.noData = ctrls.content.find('.queue-no-data');
        ctrls.shareButton = ctrls.content.find('.share-button');

        ctrls.pihakItems = $(".pihak__items");

        ctrls.optionButton = $(".option-buttons__button");

        events.on("updateView", updateView);

        return ctrls;
    };

    var bindFunctions = function() {
        ctrls.statusButton.on('click', statusButtonClick);
        ctrls.pihakItems.on('click', pihakItemsClicked);
        ctrls.optionButton.on('click', optionItemsClicked);
        ctrls.allFilter.on('click', filterButtonClicked);
        ctrls.pidanaFilter.on('click', filterButtonClicked);
        ctrls.perdataFilter.on('click', filterButtonClicked);
        ctrls.doneFilter.on('click', filterButtonClicked);
        ctrls.shareButton.on('click', shareButtonClick);
    };

    var filterButtonClicked = function(event){
        let self = $(this);
        let activeClass = 'tipe-perkara__button--active';
        let isActive = self.hasClass(activeClass);
        let type =  self.html();
        var prevFilterButton = ctrls.content.find("." + activeClass);

        if (prevFilterButton) {
            prevFilterButton.removeClass(activeClass);
        }
        self.addClass(activeClass);

        if (isActive){
            return;
        } else {
            filter(type);
        }
    }

    function getCurrentFilter (){
        var currentFilter = ctrls.content.find(".tipe-perkara__button.tipe-perkara__button--active").html();
        return currentFilter;
    }

    function filter (type){
        var counter = 0;

        if (type == 'Pidana') {
            ctrls.allItems.each(function(index, item) {
                let jItem = $(item);
                let hideThis = !jItem.hasClass('pidana') || jItem.hasClass('queue-item-done');
                if (hideThis) {
                    jItem.hide();
                } else {
                    counter++;
                    jItem.show();
                }
            });
        } else if (type == 'Perdata') {
            ctrls.allItems.each(function(index, item) {
                let jItem = $(item);
                let hideThis = !jItem.hasClass('perdata') || jItem.hasClass('queue-item-done');
                if (hideThis) {
                    jItem.hide();
                } else {
                    counter++;
                    jItem.show();
                }
            });
        } else if (type == 'Selesai') {
            ctrls.allItems.each(function(index, item) {
                let jItem = $(item);
                let hideThis = !jItem.hasClass('queue-item-done');
                if (hideThis) {
                    jItem.hide();
                } else {
                    counter++;
                    jItem.show();
                }
            });
        } else {
            ctrls.allItems.each(function(index, item) {
                let jItem = $(item);
                let hideThis = jItem.hasClass('queue-item-done');
                if (hideThis) {
                    jItem.hide();
                } else {
                    counter++;
                    jItem.show();
                }
            });
        }

        if (counter == 0) {
            ctrls.noData.show();
        } else {
            ctrls.noData.hide();
        }
    }

    var statusButtonClick = function(event) {
        event.preventDefault();
        if (id_sebagai != 8){
            return;
        }

        statusButtonAction($(this));
    };

    function statusButtonAction (self){
        var parent = self.closest(".ncontent-queue-item");
        var currentStatus = self.attr("status");

        if (currentStatus == 3) { //selesai button clicked then quit
            return;
        }

        events.emit("statusSidangChoosing", currentStatus);
        events.on("statusSidangChoosed", setStatus);

        currentStatusButton = self;
        currentNcontent = parent;
    }

    var shareButtonClick = function(event){
        event.preventDefault();
        var idSidang = $(this).parent().parent().parent().find("#id-sidang").val();
        services.sendToWA(idSidang);
        // window.open('https://wa.me/6281233805275?text=Saya%20tertarik%20dengan%20mobil%20Anda%20yang%20dijual', '_blank').focus();
    };

    function initSidangFirstTime(){
        var doneSidang = ctrls.contentQueue.find ('.queue-status__status[status=4]');
        var liveSidang = ctrls.contentQueue.find ('.queue-status__status[status=2]');

        doneSidang.each(function(index, item){
            convertToDone ($($(item).parentsUntil('.ncontent-queue-item').parent()[0]));
        });

        liveSidang.each(function(index, item){
            var cardSidang = $($(item).parentsUntil('.ncontent-queue-item').parent()[0]);
            var idSidang = cardSidang.find("#id-sidang").val();
            hideCard(cardSidang);
        });

        var currentFilter = getCurrentFilter();
        filter(currentFilter);
        initSidang(ncontentLive.getCurrentRuangan());
    }

    //event subscriber
    function setStatus(object, contentQueueItem = currentNcontent, statusButton = currentStatusButton) {
        
        var idSidang = contentQueueItem.find("#id-sidang").val();
        var prevLiveElement = $(".ncontent-queue-item--hide");
        var idSidang = statusButton.parentsUntil('.ncontent-queue-item').parent().find('#id-sidang').val();

        events.off("statusSidangChoosed", setStatus);

        if (object.status == -1){
            return;
        }else if (object.status == 1){
            statusButton.attr('status', object.status);
            setHtml (statusButton, object.status);
        }else if (object.status == 2){
            //cari sidang pada ruangan tersebut
            services.getSidang("", object.ruangan, 2, function(data){
                var jsonParsed = JSON.parse(data);
                var sidang = jsonParsed.sidang;
                $.LoadingOverlay("show");
                if (sidang.length > 0){
                    services.updateSidang (sidang[0].id, 4, function(data){
                        //endSidang(prevLiveElement, true);
                        sendToDone(prevLiveElement);
                        services.updateSidang(idSidang, object.status, function(data){
                            hideCard(contentQueueItem);
                            initSidang(object.ruangan);
                        }, object.ruangan);
                        $.LoadingOverlay("hide");
                    });
                } else {
                    services.updateSidang(idSidang, object.status, function(data){
                        hideCard(contentQueueItem);
                        initSidang(object.ruangan);
                        $.LoadingOverlay("hide");
                    }, object.ruangan);
                }
            });
            statusButton.attr('status', object.status);
            setHtml (statusButton, object.status);
        } else if (object.status == 4){
            services.updateSidang(idSidang, object.status, function(data){
                sendToDone(contentQueueItem)
                statusButton.attr('status', object.status);
                setHtml (statusButton, object.status);
            }, object.ruangan);
        }
    }

    function fetchChanges (){
        setInterval(function(){
            jQuery.ajax({
                type: "GET",
                dataType: "text",
                url: baseURL + "noise/getSidang"
            }).done(function(data) {
                var jsonParsed = JSON.parse(data);
                var sidang = jsonParsed.sidang;

                events.emit("updateView", {
                    sidang : sidang
                });
            });
        }, 5000);
    }

    function updateView (object){
        var sidang = object.sidang;
        
        sidang.forEach(function(s, si){
            var contentQueueItem = ctrls.content.find('#id-sidang[value='+s.id+']').parent();
            var statusButton = contentQueueItem.find('.queue-status__status');
            var contentQueueItemStatus = statusButton.attr('status');
            var pihak = s.pihak;
            var prevLiveElement = $(".ncontent-queue-item--hide");

            pihak.forEach (function(p, pi){
                var pihakItem = contentQueueItem.find('[id=pihak-'+p.id+']');
                setPihakAvailability(pihakItem, p.status);
            });
            
            statusButton.attr('status', s.id_status_sidang);
            setHtml (statusButton, s.id_status_sidang);
            if (s.id_status_sidang == 2){
                currentLiveSidangId = ncontentLive.getCurrentSidangId();
                currentLiveSidangRuangan = ncontentLive.getCurrentRuangan();
                
                if (currentLiveSidangRuangan == s.id_ruangan){
                    if (currentLiveSidangId == s.id){
                    
                    } else {
                        hideCard(contentQueueItem);
                        initSidang();
                    }
                }else{
                    hideCard(contentQueueItem);
                }
            }

            if (s.id_status_sidang == 4){
                if (contentQueueItemStatus != 4){
                    sendToDone(contentQueueItem);
                    events.emit("sidangStop", {
                        id_ruangan : s.id_ruangan
                    });
                }
            }
        });
    }

    function setPihakAvailability (element, status){
        var statusButtons = element.parent().siblings().last().find('.option-buttons__button');
        var readyButton =  $(statusButtons[1]);
        var notreadyButton =  $(statusButtons[0]);

        if (status == 1){
            element.addClass("pihak__item--active");
            notreadyButton.removeClass("option-buttons__button--active");
            readyButton.addClass("option-buttons__button--active");
        } else {
            element.removeClass("pihak__item--active");
            notreadyButton.addClass("option-buttons__button--active");
            readyButton.removeClass("option-buttons__button--active");
        }
    }

    function initSidang (idRuangan = ''){
        $.LoadingOverlay("show");
        events.emit("sidangStart", {
            id_ruangan: idRuangan
        });
    }

    function endSidang (element, previouslyLive){
        var idSidang = element.find("#id-sidang").val();

        events.emit("sidangStop", {
            id_sidang: idSidang,
            element: element,
            previouslyLive: previouslyLive
        });
    }

    function stop(object) {
        // events.off("sidangStop", stop);
        var content = ctrls.content.find('#id-sidang[value='+object.idSidang+']').parent();
        
        sendToDone(content);
    }

    function sendToDone(content) {
        var contentIsDone = content.hasClass("queue-item-done");
        if (!contentIsDone){
            content.animate({
                height: "0px"
            }, 500, function() {
                convertToDone(content, function(){
                    if (getCurrentFilter() != "Selesai"){
                        content.hide();
                    } else {
                        content.show();
                    }
                });
            });
        }
    }

    function convertToDone(content, onComplete = null){
        var container = content.find(".ncontent-queue-item__container");
        var noperkara = content.find(".queue-no-perkara__no");
        var statusButton = content.find(".queue-status__status");
        var pihak = content.find(".pihak");

        container.addClass("ncontent-queue-item__container--done");
        noperkara.addClass("queue-no-perkara__no--done");
        setHtml(statusButton, 4);
            
        content.height("auto");
        if (content.hasClass("ncontent-queue-item--hide")) content.removeClass("ncontent-queue-item--hide");
        if (pihak) pihak.remove();
        content.addClass("queue-item-done");
        if (onComplete){
            onComplete();
        }
    }

    function hideCard (element){
        element.animate({
            height: "0px"
        }, 500, function() {
            element.addClass("ncontent-queue-item--hide");
        });
    }

    function setHtml(element, status) {
        var baseClass = 'queue-status__status';
        var html = "";
        var addClass = "";

        if (status == 1) { // siap sidang
            addClass = 'queue-status__status--ready';
            html = 'Siap Sidang <span class="material-icons-outlined" style="font-size: 12px;">history</span>';
        } else if (status == 2) { // berlangsung
            addClass = 'queue-status__status--live';
            html = 'Berlangsung <span class="material-icons-outlined" style="font-size: 12px;">play_circle_filled</span>';
        } else if (status == 3) { // skorsing
            addClass = 'queue-status__status--suspend';
            html = 'Selesai <span class="material-icons-outlined" style="font-size: 12px;">skors</span>';
        } else if (status == 4) { // selesai
            addClass = 'queue-status__status--done';
            html = 'Selesai <span class="material-icons-outlined" style="font-size: 12px;">done</span>';
        } else if (status == 0){
            addClass = 'status';
            html = 'Persiapan<span class="material-icons-outlined" style="font-size: 12px;">keyboard_arrow_down</span>';
        }
        
        element.attr('class', baseClass);
        element.addClass(addClass);
        element.html(html);
    }

    var pihakItemsClicked = function(event) {
        if (!$(this).hasClass("pihak__items--owner")){
            return;
        }
        event.preventDefault();

        var parent = $(this).parent();
        var options = parent.find(".pihak-options");
        var height = 0;
        var prevOption = $(".pihak__options.pihak-options.active");
        var prevOptionHeight = prevOption.height();

        options.height("auto");
        height = options.height();
        options.height("0px");

        if (prevOption.length > 0) {
            var offset = 0;
            if (prevOption.offset().top < parent.offset().top) {
                offset -= prevOption.height();
            }

            prevOption.height(prevOptionHeight);
            prevOption.animate({
                height: "0px"
            }, 500);

            $('html, body').animate({
                scrollTop: parent.offset().top - ($(window).height() / 2) + (height / 2) + offset
            }, 500);

            if (options.hasClass("active")) {
                prevOption.removeClass("active");
                return;
            } else {
                prevOption.removeClass("active");
            }
        } else {
            $('html, body').animate({
                scrollTop: parent.offset().top - ($(window).height() / 2) + (height / 2)
            }, 500);
        }

        options.animate({
                height: height
            }, 500,
            function() {

            });

        options.addClass("active");
    }

    var optionItemsClicked = function(event) {
        event.preventDefault();

        var self = $(this);

        if (self.hasClass("option-buttons__button--active")) {
            return;
        }

        var buttontype = self.attr("status");
        var neighbour = self.parent().find((".option-buttons__button.option-buttons__button--active"));
        var belongto = self.parent().attr("belongto");
        var indicator = self.closest(".pihak__container").find("#" + belongto);
        var idSidangPihak = self.parentsUntil('.pihak__container').last().parent().find('#id-sidang-pihak').val();
        var idSidang = self.parentsUntil('.ncontent-queue-item').last().parent().find('#id-sidang').val();
        var statusButton = self.parentsUntil('.ncontent-queue-item').last().parent().find('.queue-status__status');
   
        if (neighbour) {
            if (neighbour.hasClass("option-buttons__button--active")) {
                neighbour.removeClass("option-buttons__button--active");
            }
        }

        $.LoadingOverlay("show");

        jQuery.ajax({
            type: "POST",
            dataType: "text",
            data : {
                idSidang : idSidang,
                idSidangPihak : idSidangPihak,
                status : buttontype == 1 ? 1 : 0
            },
            url: baseURL + "noise/updateSidangPihak"
        }).done(function(data) {
            console.log(data);
            $.LoadingOverlay("hide");
            self.addClass("option-buttons__button--active");

            if (buttontype == 1) {
                indicator.addClass("pihak__item--active");
            } else if (buttontype == 2) {
                indicator.removeClass("pihak__item--active");
            }

            if (data == 1){
                statusButton.attr('status', 1);
                setHtml (statusButton, 1);
            } else {
                statusButton.attr('status', 0);
                setHtml (statusButton, 0);
            }
        });
    }

    return {
        init: init,
        liveElement: function() {
            return $(".ncontent-queue-item--hide");
        }
    };
}());