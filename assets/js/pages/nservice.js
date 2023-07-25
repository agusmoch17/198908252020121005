var services = {
    updateSidang: function(idSidang, idStatus, onComplete = null, idRuangan = '') {
        jQuery.ajax({
            type: "POST",
            dataType: "text",
            data : {
                idSidang : idSidang,
                idStatus : idStatus,
                idRuangan : idRuangan
            },
            url: baseURL + "noise/updateSidang"
        }).done(function(data) {
            if (onComplete){
                onComplete(data);
            }
        });
    },
    getSidang: function (idSidang = "", idRuangan = "", idStatusSidang = "", onComplete = null){
        jQuery.ajax({
            type: "POST",
            dataType: "text",
            data :{
                idSidang : idSidang,
                idRuangan : idRuangan,
                idStatusSidang : idStatusSidang
            },
            url: baseURL + "noise/getSidang"
        }).done(function(data) {
            if (onComplete){
                onComplete(data);
            }
        });
    },
    getRuangan: function (onComplete = null){
        jQuery.ajax({
            type: "POST",
            dataType: "text",
            url: baseURL + "noise/getRuangan"
        }).done(function(data) {
            if (onComplete){
                onComplete(data);
            }
        });
    },
    getLiveSidang: function (idRuangan, onComplete = null){
        jQuery.ajax({
            type: "POST",
            dataType: "text",
            url: baseURL + "noise/getLiveSidang"
        }).done(function(data) {
            if (onComplete){
                onComplete(data);
            }
        });
    },
    sendToWA: function sendToWA (idSidang, onComplete = null){
        services.getSidang(idSidang, "", "", function(data){
            $.LoadingOverlay("hide");
            var jsonParsed = JSON.parse(data);
            var sidang = jsonParsed.sidang[0];
            var txt = "";
            var i = 0;
            
            if (sidang){
                txt += "%2ANo%20Perkara%20:%20" + sidang.no_perkara + "%2A%0a";
                var status = sidang.id_status_sidang;
                if (sidang.id_status_sidang == 0){//persiapan
                    status = sidang.status + "%2A%20" + encodeURIComponent("🕐");
                }
                if (sidang.id_status_sidang == 1){//siap sidang
                    status = sidang.status + "%2A%20" + encodeURIComponent("⏯");
                }
                if (sidang.id_status_sidang == 2){//berlangsung
                    status = sidang.status + "%2A%20" + encodeURIComponent("▶️");
                }
                if (sidang.id_status_sidang == 3){//skors
                    status = sidang.status + "%2A%%20" + encodeURIComponent("⏸");
                }
                if (sidang.id_status_sidang == 4){//selesai
                    status = sidang.status + "%2A%20" + encodeURIComponent("✅");
                }
                if (sidang.id_alur_perkara >= 111 && sidang.id_alur_perkara != 114){
                    txt += "%2ATerdakwa%20:%20" + sidang.tergugat + "%2A%0a";
                }else if (sidang.id_alur_perkara=='2' || sidang.id_alur_perkara=='10' || sidang.id_alur_perkara=='12' || sidang.id_alur_perkara=='13' || sidang.id_alur_perkara=='14' || sidang.id_alur_perkara=='16' || sidang.id_alur_perkara=='622'){
                    txt += "%2APemohon%20:%20" + sidang.pemohon + "%2A%0a";
                }else if (sidang.id_alur_perkara <= 100){
                    txt += "%2ATergugat%20:%20" + sidang.tergugat + "%2A%0a";
                }
                txt += "%2AStatus%20Sidang%20:%20" + status + "%0a";
                txt += "%0a";
                sidang.pihak.forEach(function (p, pi){
                    txt += p.nama + "%20:%20" + (p.status == "1" ? ("Siap%20" + encodeURIComponent("✅")) : ("Belum%20Siap%20" + encodeURIComponent("☑️")))  + "%0a";
                });
                txt += "%0a";
                txt += "untuk%20status%20sidang%20selengkapnya%20visit%20noise%20di%20%2A" + window.location.href + "%2A";
                
                var url = 'https://api.whatsapp.com/send?text=' + txt;
            }

            window.open(url, '_blank').focus();
        });
    }
};