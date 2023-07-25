<?php
// print_r($dataRekrutmen[0]["id"]);
// die;
?>
<div class="page-info">
    <h4 style="display: inline-block;">Data Rekrutmen Tim Developer Mahkamah Agung</h4>

    <div class="page-options">
        <div class="modal fade detail-pelamar" tabindex="-1" role="dialog" aria-labelledby=".detail-pelamar" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form action="<?php echo base_url(); ?>announcer/confirmAddAnnouncement" method="POST">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Detail Pelamar</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <i class="material-icons">close</i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h1 id="nama">Moch Agus</h1>
                            <h3><small id="posisi">Sistem/Bisnis Analis</small></h3>
                            <table class="table-pelamar-detail">
                                <tr>
                                    <td><strong>NIP</strong></td>
                                    <td id="nip">198908252020121005</td>
                                </tr>
                                <tr>
                                    <td><strong>SATUAN KERJA</strong></td>
                                    <td id="satuan">Pengadilan Negeri Sinjai</td>
                                </tr>
                                <tr>
                                    <td><strong>BAHASA PERMROGRAMAN</strong></td>
                                    <td id="bahasa">PHP</td>
                                </tr>
                                <tr>
                                    <td><strong>FRAMEWORK</strong></td>
                                    <td id="framework">PHP</td>
                                </tr>
                                <tr>
                                    <td><strong>DATABASE</strong></td>
                                    <td id="db">MYSQL</td>
                                </tr>
                                <tr>
                                    <td><strong>TOOLS</strong></td>
                                    <td id="tool">Visual Studio</td>
                                </tr>
                                <tr>
                                    <td><strong>PERNAH MEMBUAT MOBILE APPS</strong></td>
                                    <td id="mobile">Pernah</td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="main-wrapper">
    <div class="row">
        <div class="col-lg-12">
            <div class="card card-transactions">
                <div class="card-body" id="blockui-card-1">
                    <h5 class="card-title" id="search-result-title">Data Pelamar<a href="#" class="card-title-helper blockui-transactions"><i class="material-icons">refresh</i></a></h5>
                    <div class="alert alert-success pihak-notice" role="alert" style="display: none;">
                        PNBP Berhasil ditambahkan;
                    </div>
                    <table id="rektrutmen-list" class="rektrutmen-list" style="width:100%">
                        <thead>
                            <tr>
                                <th scope="col" style="width: 200px;">Nama</th>
                                <th scope="col">Satuan Kerja</th>
                                <th scope="col">Posisi</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            foreach ($dataRekrutmen as $item) {
                            ?>
                            <div>
                            <p hidden><?= $item["nip"] ?></p>
                                    <p hidden><?= $item["satuan_kerja"] ?></p>
                            </div>
                                <tr>
                                    <td style="width: 200px;"><strong><?= $item["nama"] ?></strong><br><?= $item["nip"] ?></td>
                                    <td><?= $item["satuan_kerja"] ?></td>
                                    <td><?= $item["posisi_yang_dipilih"] ?></td>
                                    <td>
                                        <button type="button" row-index="" data-toggle="modal" data-target=".detail-pelamar" data-pelamarid="<?= base64_encode($item["id"])?>" class="btn btn-primary btn-xs mr-2 detail-pelamar">DETAIL</button>
                                    </td>
                                </tr>
                            <?php
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?= base_url() ?>assets/plugins/DataTables/datatables.min.js"></script>
<script src="<?= base_url() ?>assets/plugins/select2/js/select2.full.min.js"></script>
<script src="<?= base_url() ?>assets/plugins/swal/sweetalert2.all.min.js"></script>
<script>
    $(document).ready(function() {
        pnbpTable = $('.rektrutmen-list').DataTable({
            searching: true,
            paging: true,
            info: false,
            order: [[2, 'asc']]
        });
    });

    $('.rektrutmen-list').on('click', '.detail-pelamar', function() {
        var id = $(this).attr('data-pelamarid');

        $.ajax({
            url: baseURL + 'report/getPelamarData',
            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(response) {
                if (response.data) {
                    var data = response.data;
                    $('#nama').text (data["nama"]);
                    $('#posisi').text (data["posisi_yang_dipilih"]);
                    $('#nip').html (data["nip"]);
                    $('#satuan').html (data["satuan_kerja"]);
                    $('#bahasa').html (data["bahasa_pemrograman_yang_dikuasai"]);
                    $('#framework').html (data["framework_bahasa_pemrograman_yang_dikuasai"]);
                    $('#database').html (data["database_yang_dikuasai"]);
                    $('#tools').html (data["tools_yang_dikuasai"]);
                    $('#mobile').html (data["pernah_membuat_mobile_apps"]);
                }
            },
            error: function() {

            }
        });
    });
</script>
<style>
    .table-pelamar-detail tr td{
        /* border: 1px solid; */
        padding: 10px;
    }
</style>