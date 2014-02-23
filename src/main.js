function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	if(width > config.width)width  = config.width;
	if(height > config.height)height = config.height;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	global.screen.renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	global.screen.renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	global.stats.domElement.style.left = w + "px";
	global.stats.domElement.style.top = h + "px";
	
	global.screen.renderer.resize(width, height);
	$('canvas').height = 100;
}

function update()
{
	global.stats.begin();
	for (var i = 0; i < Character.array.length; i++) 
	{
		Character.array[i].frameAction();		
	}
	global.screen.render();
	requestAnimFrame(update);
	global.stats.end();
}