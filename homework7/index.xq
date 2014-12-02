declare namespace html="http://www.w3.org/1999/xhtml";
declare namespace my = "http://www.example.com";
declare function my:title($e as node()) as xs:string{
$e/PLAY/TITLE
};
 
 <html xmlns="http://www.w3.org/1999/xhtml">
 <head>
 <title>Plays</title>
 <link rel="stylesheet" type="text/css" href="/resources/site.css" />
 </head>
 <body>
 
 <div>
 <h1>A List of All of Shakespeare's Plays</h1>
 <h3>Click on a play to see its text.</h3>
 </div>
  

 <div id="plays">
  {
for $li in /html:ul/html:li
	let $href := string($li/html:a/@href),
	$base := substring-before($href, '.xml'),
	$play := doc(resolve-uri($href,base-uri(/)))
	return <p><a href="{$base}/">{my:title($play)}</a></p>
    
}
 </div>
 </body>
 </html>