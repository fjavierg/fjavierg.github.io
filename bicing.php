<?php

/**
 * bicing.php Gets XML Bicing data from OPENDATA BCN web service, transforms it into KML and writes output to OUTPUT_FILE
 * 
 * @author Jagova65
 * @version 1.0
 *
 * Requires: XSL PHP extension
 * Requires: allow_url_fopen = ON setting in php.ini to open url files
 */

define ('OPENDATA_URL','http://wservice.viabicing.cat/v1/getstations.php?v=1');
define ('XSL_FILE','resources/data/Bicing.xsl');
define ('OUTPUT_FILE',"resources/data/opendataBicing.out.kml");

   $xslDoc = new DOMDocument();
   $xslDoc->load(XSL_FILE);
   
   $response_xml_data = file_get_contents(OPENDATA_URL);
   if($response_xml_data){
	   $xmlDoc = new DOMDocument();
	   $xmlDoc->loadXML($response_xml_data);

	   $proc = new XSLTProcessor();
	   $proc->importStylesheet($xslDoc);
	   
	   $actual_url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	   $actual_url_path = substr($actual_url,0,strrpos ($actual_url,'/'));
	   echo 'http' . $actual_url_path;
	   $proc->setParameter('', 'Host', $actual_url_path);
	   $res = file_put_contents (OUTPUT_FILE,$proc->transformToXML($xmlDoc));
           if ($res){echo "OK";}
   }
?>