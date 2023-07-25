<?php defined('BASEPATH') or exit('No direct script access allowed');

class BaseController extends CI_Controller
{


    public function response($data = NULL)
    {
        $this->output->set_status_header(200)->set_content_type('application/json', 'utf-8')->set_output(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))->_display();
        exit();
    }

    function loadViews($viewName = "", $headerInfo = NULL, $pageInfo = NULL, $footerInfo = NULL, $asData = false)
    {
        $this->load->view('includes/header', $headerInfo);
        $this->load->view($viewName, $pageInfo);
        $this->load->view('includes/footer', $footerInfo);
    }

    function loadPages($viewName = "", $headerInfo = NULL, $pageInfo = NULL, $footerInfo = NULL, $asData = false)
    {

        $this->load->view('pages/includes/header', $headerInfo);
        $this->load->view($viewName, $pageInfo);
        $this->load->view('pages/includes/footer', $footerInfo);
    }

    function isLoggedIn()
    {
        $_SESSION['url'] = $_SERVER['REQUEST_URI']; 

        $isLoggedIn = $this->session->userdata('isLoggedIn');

        if (!isset($isLoggedIn) || $isLoggedIn != TRUE) {
            redirect('login');
        } else {
            // $this->role = $this->session->userdata('role');
            // $this->vendorId = $this->session->userdata('userId');
            // $this->name = $this->session->userdata('name');
            // $this->roleText = $this->session->userdata('roleText');

            // $this->global['name'] = $this->name;
            // $this->global['role'] = $this->role;
            // $this->global['role_text'] = $this->roleText;
        }
    }

    function logout()
    {
        $this->session->sess_destroy();

        redirect('login');
    }
}
