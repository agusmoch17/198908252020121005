<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Responsive Admin Dashboard Template">
    <meta name="keywords" content="admin,dashboard">
    <meta name="author" content="stacks">
    <!-- The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title -->
    <title>198908252020121005</title>

    <!-- Styles -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
    <link href="<?= base_url() ?>assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/plugins/font-awesome/css/all.min.css" rel="stylesheet">


    <!-- Theme Styles -->
    <link href="<?= base_url() ?>assets/css/connect.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/css/admin3.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/css/dark_theme.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/css/custom.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/plugins/jquery/jquery-ui.css">
    <link href="<?= base_url() ?>assets/css/dropzone.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/plugins/select2/css/select2.min.css" rel="stylesheet"    

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    <script src="<?= base_url() ?>assets/plugins/jquery/jquery-3.4.1.min.js"></script>
    <script src="<?= base_url() ?>assets/plugins/jquery/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="<?= base_url() ?>assets/plugins/moment/moment.min.js"></script>
    <script src="<?= base_url() ?>assets/plugins/loadingoverlay/loadingoverlay.js"></script>
    <script type="text/javascript">
        var baseURL = "<?php echo base_url(); ?>";
        
    </script>
</head>

<body>
    <div class='loader'>
        <div class='spinner-grow text-primary' role='status'>
            <span class='sr-only'>Loading...</span>
        </div>
    </div>
    <div class="connect-container align-content-stretch d-flex flex-wrap">
        <div class="page-sidebar">
            <div class="logo-box" style="margin-bottom:5px;text-align: center;padding-left: 15px;padding-right: 15px;padding-top: 0px;padding-bottom: 5px;"><a href="#" class="logo-text"><img src="<?= base_url() ?>assets/images/logo_white.png" style="width:150px;height:auto;"></a></div>
            <div class="logo-box" style="font-weight: 700;font-size: 8pt;color:#ccc;text-align: center;padding-left: 15px;padding-right: 15px;padding-top: 0px;padding-bottom: 0px;">TES DEVELOPER MAHKAMAH AGUNG RI</div>
            <div class="page-sidebar-inner slimscroll">
                <ul class="accordion-menu">
                    <li class="sidebar-title">
                        Tools
                    </li>
                    <li>
                        <a href="<?= base_url("report") ?>"><i class="material-icons-outlined">dashboard</i>Data Rekrutmen</a>
                    </li>
                    <li>
                        <a href="<?= base_url("report") ?>"><i class="material-icons-outlined">inbox</i>Data Attribute</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-container">
            <div class="page-header">
                <nav class="navbar navbar-expand">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav">
                        <li class="nav-item small-screens-sidebar-link">
                            <a href="#" class="nav-link"><i class="material-icons-outlined">menu</i></a>
                        </li>
                        <li class="nav-item nav-profile dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="<?= base_url() ?>assets/images/avatars/profile-image-1.png" alt="profile image">
                                <span>MOCH. AGUS</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="page-content">
                <div class="page-info">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Apps</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>