<?php

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
	   $res = file_put_contents (OUTPUT_FILE,$proc->transformToXML($xmlDoc));
           if ($res){echo "OK";}
   }
?>