$(function() { 
	$(":file").change(

		function () {
			if (this.files && this.files[0]) {
				var reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
		}

	});
});

function imageIsLoaded (e) {
	$('#displayImg')
	.attr('src', e.target.result)
	.one("click", function() {updateFace($('#displayImg'));});
}

function updateFace(imgElement){

	var tracker = new tracking.ObjectTracker("face"); 
	tracker.setStepSize(1.7);	
	tracking.track('#displayImg', tracker);

	tracker.on('track', function(event) {
        event.data.forEach(function(face) {
                $('<div>', {
                    'class':'face',
                    'css': {
                        'position': 'absolute',
                        'left':     face.x + 'px',
                        'top':      face.y + 'px',
                        'width':    face.width  + 'px',
                        'height':   face.height + 'px'
                    },
                    'data-toggle':"topoltip",
                    'data-placement':"bottom",
                    'title':"28 | YOU WILL DIE OLD AND LONELY"
                }).insertAfter(imgElement).tooltip();
            });
      });

}
