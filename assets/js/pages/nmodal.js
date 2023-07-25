var statusModal = (function() {
    var ctrls = {};
    var choosedStatus;

    var init = function() {
        ctrls = bindControls();
        bindFunctions();
    };

    var bindControls = function() {
        var ctrls = {};

        ctrls.statusModal = $(".status-modal");
        ctrls.statusModal.buttons = $(".status-modal__buttons");

        return ctrls;
    };

    var bindFunctions = function() {
        ctrls.statusModal.buttons.on('click', ".status-modal__button", statusOptionClick);
        ctrls.statusModal.buttons.on('click', ".ruangan-modal__button", ruanganOptionClick);
    };

    events.on('statusSidangChoosing', setButtons);

    function setButtons(currentStatus) {
        var modal = ctrls.statusModal;
        var buttons = ctrls.statusModal.buttons;
        var html = '';

        if (currentStatus < 1) {
            html += '<div class="status-modal__button" choosedstatus="1"><span class="material-icons-outlined">history</span> Siap Sidang</div>';
        }
        if (currentStatus < 2) {
            html += '<div class="status-modal__button" choosedstatus="2"><span class="material-icons-outlined">play_circle_filled</span> Sedang Berlangsung</div>';
        }
        if (currentStatus < 4) {
            html += '<div class="status-modal__button" choosedstatus="4"><span class="material-icons-outlined">done</span> Selesai</div>';
        }

        html += '<div class="status-modal__button" style="color: red;" choosedstatus="-1"><span class="material-icons-outlined">close</span> Cancel</div>';
        buttons.html(html);
        modal.show();
    }

    function setRuangan(){
        var buttons = ctrls.statusModal.buttons;
        services.getRuangan(function(data){
            if (data){
                var jsonParsed = JSON.parse(data);
                var ruangan = jsonParsed.ruangan;
                var html = '';

                ruangan.forEach(function(item, index) {
                    html += '<div class="ruangan-modal__button" choosedruangan="'+ item['id'] +'">'+item['nama']+'</div>';
                });

                buttons.html(html);
            }
        });
    }

    var statusOptionClick = function(event) {
        event.preventDefault();

        choosedStatus = $(this).attr("choosedstatus");

        if (choosedStatus == 2){
            setRuangan();
        }else{
            events.emit("statusSidangChoosed", {'status' : choosedStatus});
            ctrls.statusModal.hide();
        }
    }

    var ruanganOptionClick = function(event){
        event.preventDefault();
        var choosedRuangan = $(this).attr("choosedruangan");

        events.emit("statusSidangChoosed", {'status' : choosedStatus, 'ruangan' : choosedRuangan});
        ctrls.statusModal.hide();
    }

    return {
        init: init
    };
}());