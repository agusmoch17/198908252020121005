<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

class Report extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        date_default_timezone_set("Asia/Makassar");
    }

    public function index()
    {
        $ch = curl_init();

        $url = 'http://103.226.55.159/json/data_rekrutmen.json';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);

        curl_close($ch);

        if ($response === false) {
            die('Error fetching data: ' . curl_error($ch));
        }

        $data["dataRekrutmen"] = json_decode($response, true)["Form Responses 1"];
        // echo base_url();
        // print_r($data["dataRekrutmen"][0]);
        // $this->load->view("report", $data);
        $this->loadViews("report", NULL, $data, NULL);
    }

    function getPelamarData()
    {
        $id = base64_decode($this->input->post('id'));

        $ch = curl_init();

        $url = 'http://103.226.55.159/json/data_rekrutmen.json';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);

        curl_close($ch);

        if ($response === false) {
            die('Error fetching data: ' . curl_error($ch));
        }

        $data = json_decode($response, true)["Form Responses 1"];

        foreach ($data as $item) {
            if ($item["id"] == $id) {
                $response = array(
                    'status' => "success",
                    'data' => $item
                );

                echo json_encode($response);
            }
        }
    }
}
